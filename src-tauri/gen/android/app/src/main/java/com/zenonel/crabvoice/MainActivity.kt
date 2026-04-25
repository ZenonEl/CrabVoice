package com.zenonel.crabvoice

import android.app.PictureInPictureParams
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.util.Rational
import androidx.activity.enableEdgeToEdge
import java.io.File

class MainActivity : TauriActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    enableEdgeToEdge()
    super.onCreate(savedInstanceState)
    File(filesDir, "pip_allowed.txt").writeText("0")
    handleSharedIntent(intent)
  }

  override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    handleSharedIntent(intent)
  }

  override fun onUserLeaveHint() {
    super.onUserLeaveHint()
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return
    if (!isPipAllowed()) return
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
    File(filesDir, "pip_allowed.txt").readText().trim() == "1"
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
