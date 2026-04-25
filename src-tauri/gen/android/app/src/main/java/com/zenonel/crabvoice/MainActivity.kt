package com.zenonel.crabvoice

import android.app.PictureInPictureParams
import android.content.Intent
import android.content.res.Configuration
import android.os.Build
import android.os.Bundle
import android.os.FileObserver
import android.util.Log
import android.util.Rational
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import androidx.activity.enableEdgeToEdge
import java.io.File

class MainActivity : TauriActivity() {
  private var pipFlagObserver: FileObserver? = null

  override fun onCreate(savedInstanceState: Bundle?) {
    enableEdgeToEdge()
    super.onCreate(savedInstanceState)
    File(filesDir, "pip_allowed.txt").writeText("0")
    handleSharedIntent(intent)
    applyPipParams()
    startPipFlagObserver()
  }

  override fun onPictureInPictureModeChanged(isInPipMode: Boolean, newConfig: Configuration) {
    super.onPictureInPictureModeChanged(isInPipMode, newConfig)
    Log.i("CrabVoice", "onPictureInPictureModeChanged: isInPip=$isInPipMode")
    if (isInPipMode) {
      // Tauri's wry calls WebView.onPause() when activity goes to background, freezing JS and media.
      // Re-resume the WebView so video keeps playing in PIP.
      val wv = findWebView(window.decorView)
      Log.i("CrabVoice", "PIP entry: webView=$wv")
      try {
        wv?.onResume()
        wv?.resumeTimers()
      } catch (e: Exception) {
        Log.w("CrabVoice", "Failed to resume webview: ${e.message}")
      }
    }
  }

  private fun findWebView(view: View): WebView? {
    if (view is WebView) return view
    if (view is ViewGroup) {
      for (i in 0 until view.childCount) {
        val result = findWebView(view.getChildAt(i))
        if (result != null) return result
      }
    }
    return null
  }

  override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    handleSharedIntent(intent)
  }

  // Apply PIP params with autoEnter based on the JS-written flag file.
  // Android 12+ (API 31): autoEnter handles gesture/Home navigation reliably.
  // Older Android falls back to onUserLeaveHint.
  private fun applyPipParams() {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return
    val allowed = isPipAllowed()
    Log.i("CrabVoice", "applyPipParams: pip_allowed=$allowed")
    val builder = PictureInPictureParams.Builder().setAspectRatio(Rational(16, 9))
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      builder.setAutoEnterEnabled(allowed)
    }
    try {
      setPictureInPictureParams(builder.build())
    } catch (e: Exception) {
      Log.w("CrabVoice", "setPictureInPictureParams failed: ${e.message}")
    }
  }

  // Watch the flag file for JS-side updates and re-apply params.
  private fun startPipFlagObserver() {
    val flagFile = File(filesDir, "pip_allowed.txt")
    val observer = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
      object : FileObserver(flagFile, MODIFY or CLOSE_WRITE) {
        override fun onEvent(event: Int, path: String?) { runOnUiThread { applyPipParams() } }
      }
    } else {
      @Suppress("DEPRECATION")
      object : FileObserver(flagFile.absolutePath, MODIFY or CLOSE_WRITE) {
        override fun onEvent(event: Int, path: String?) { runOnUiThread { applyPipParams() } }
      }
    }
    observer.startWatching()
    pipFlagObserver = observer
  }

  // Fallback for Android < 12 where setAutoEnterEnabled isn't available
  override fun onUserLeaveHint() {
    super.onUserLeaveHint()
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) return // handled by autoEnter
    val allowed = isPipAllowed()
    Log.i("CrabVoice", "onUserLeaveHint: pip_allowed=$allowed")
    if (!allowed) return
    val params = PictureInPictureParams.Builder()
      .setAspectRatio(Rational(16, 9))
      .build()
    try {
      enterPictureInPictureMode(params)
    } catch (e: IllegalStateException) {
      Log.w("CrabVoice", "PIP not supported: ${e.message}")
    }
  }

  private fun isPipAllowed(): Boolean = try {
    val raw = File(filesDir, "pip_allowed.txt").readText().trim()
    raw == "1"
  } catch (e: Exception) {
    false
  }

  private fun handleSharedIntent(intent: Intent?) {
    Log.i("CrabVoice", "handleSharedIntent: action=${intent?.action} type=${intent?.type}")
    if (intent?.action != Intent.ACTION_SEND) return
    if (intent.type != "text/plain") return
    val text = intent.getStringExtra(Intent.EXTRA_TEXT) ?: return
    Log.i("CrabVoice", "Shared text: $text")
    val url = extractUrl(text) ?: return
    val file = File(filesDir, "shared_url.txt")
    file.writeText(url)
    Log.i("CrabVoice", "Wrote shared URL to ${file.absolutePath}")
  }

  private fun extractUrl(text: String): String? {
    val match = Regex("https?://\\S+").find(text)
    return match?.value
  }
}
