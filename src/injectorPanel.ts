import { Icons } from "./icons";
import { t } from "./i18n";

export type AppTier = 'free' | 'subscribers' | 'premium';
export type IndicatorStatus = 'ok' | 'off' | 'error';
export type IndicatorId = 'proxy' | 'auth' | 'sponsorblock';

export interface PanelCallbacks {
    onClose: () => void;
    onAudioVolume: (val: number) => void;
    onVideoVolume: (val: number) => void;
    onTogglePlay: (paused: boolean) => void;
    onRefresh: () => void;
    onSponsorBlockToggle: (enabled: boolean) => void;
    onFullscreen: () => void;
}

export interface PanelOptions {
    tier: AppTier;
    sponsorBlockEnabled: boolean;
}

export class CrabPanel {
    public host: HTMLElement;
    private shadow: ShadowRoot;
    private translationPaused = false;
    private isCollapsed = false;
    private tier: AppTier;
    private sponsorBlockEnabled: boolean;

    // UI Элементы
    private wrapper!: HTMLElement;
    private fab!: HTMLElement;
    private statusEl!: HTMLElement;
    private valAudio!: HTMLElement;
    private valVideo!: HTMLElement;
    private btnTogglePlay!: HTMLElement;
    private sliderAudio!: HTMLInputElement;
    private sliderVideo!: HTMLInputElement;
    private btnSponsorBlock!: HTMLElement | null;

    constructor(private callbacks: PanelCallbacks, options?: PanelOptions) {
        this.tier = options?.tier ?? 'free';
        this.sponsorBlockEnabled = options?.sponsorBlockEnabled ?? true;
        this.host = document.createElement('div');
        this.host.id = 'cv-panel-host';
        this.shadow = this.host.attachShadow({ mode: 'open' });
        
        this.render();
        this.bindEvents();
        this.setupDraggable();
    }

    private safeSetHTML(element: HTMLElement | ShadowRoot, html: string) {
        if (window.trustedTypes && window.trustedTypes.createPolicy) {
            if (!window._cvPolicy) {
                try {
                    window._cvPolicy = window.trustedTypes.createPolicy('cv-policy-bypass', {
                        createHTML: (s: string) => s
                    });
                } catch (e) { }
            }
            if (window._cvPolicy) {
                element.innerHTML = window._cvPolicy.createHTML(html);
                return;
            }
        }
        element.innerHTML = html;
    }

    private getTierStyles(): string {
        const palettes: Record<AppTier, { accent: string; glow: string; headerBg: string; fabBorder: string }> = {
            free:        { accent: '#24c8db', glow: 'transparent',                  headerBg: '#2a2a2a', fabBorder: '#444' },
            subscribers: { accent: '#6366f1', glow: 'rgba(99, 102, 241, 0.25)',     headerBg: '#1e1e3a', fabBorder: '#6366f1' },
            premium:     { accent: '#FFD700', glow: 'rgba(255, 215, 0, 0.2)',       headerBg: '#2a2518', fabBorder: '#FFD700' },
        };
        const p = palettes[this.tier];
        return `
            --cv-accent: ${p.accent};
            --cv-glow: ${p.glow};
            --cv-header-bg: ${p.headerBg};
            --cv-fab-border: ${p.fabBorder};
        `;
    }

    private render() {
        // Build tier-specific header content
        let headerTitle = '🦀 CrabVoice';
        if (this.tier === 'subscribers') {
            headerTitle = `🦀 CrabVoice <span class="cv-tier-icon">${Icons.tierSubscribers}</span>`;
        } else if (this.tier === 'premium') {
            headerTitle = `🦀 CrabVoice <span class="cv-pro-label"><span class="cv-pro-crown">${Icons.tierPremium}</span>PRO</span>`;
        }

        const template = `
            <style>
                :host {
                    ${this.getTierStyles()}
                }

                .cv-wrapper {
                    position: fixed !important; bottom: 20px !important; right: 20px !important;
                    z-index: 2147483647 !important; font-family: sans-serif !important;
                    pointer-events: auto !important; color: #fff !important;
                }

                .cv-panel {
                    background: rgba(0,0,0,0.85) !important; border-radius: 10px !important;
                    min-width: 220px !important;
                    display: flex !important; flex-direction: column !important;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.6), 0 0 20px var(--cv-glow) !important;
                    border: 1px solid rgba(255,255,255,0.05) !important;
                    transition: box-shadow 0.3s !important;
                }

                .cv-wrapper.collapsed .cv-panel { display: none !important; }

                .cv-header {
                    font-size: 14px !important; font-weight: bold; background: var(--cv-header-bg) !important;
                    padding: 10px 15px !important; border-radius: 10px 10px 0 0 !important;
                    display: flex !important; justify-content: space-between !important; align-items: center !important;
                    cursor: grab !important; user-select: none !important;
                }
                .cv-header div { pointer-events: none !important; }
                .cv-header:active { cursor: grabbing !important; }

                .cv-btn-collapse {
                    background: #444 !important; border: none; color: #fff; cursor: pointer;
                    font-size: 12px; padding: 2px 8px; border-radius: 4px; transition: 0.2s;
                    line-height: 1; font-weight: bold;
                }
                .cv-btn-collapse:hover { background: #666 !important; }

                .cv-content { padding: 15px !important; }
                .cv-row { display: flex !important; flex-direction: column !important; gap: 5px !important; margin-bottom: 10px !important; }
                .cv-row label { font-size: 11px !important; color: #bbb !important; display: flex; justify-content: space-between; }
                .cv-slider { width: 100% !important; accent-color: var(--cv-accent) !important; cursor: pointer; }
                .cv-btn-group { display: flex !important; gap: 8px !important; margin-bottom: 10px !important; }
                .cv-btn {
                    display: flex; justify-content: center; gap: 2px;
                    background: #333 !important; color: #fff !important; border: 1px solid #555 !important;
                    padding: 6px 10px !important; border-radius: 6px !important; font-size: 12px !important;
                    cursor: pointer !important; flex: 1 !important; transition: 0.2s;
                }
                .cv-btn:hover { background: #444 !important; }
                .cv-btn-close {
                    display: flex; align-items: center; justify-content: center;
                    background: #ff5e5e !important; color: #fff !important; border: none !important;
                    padding: 8px 15px !important; border-radius: 6px !important; font-weight: bold !important;
                    cursor: pointer !important; width: 100% !important; font-size: 13px !important;
                }

                .cv-fab {
                    display: none !important; width: 48px !important; height: 48px !important;
                    background: rgba(0,0,0,0.85) !important; border-radius: 24px !important;
                    align-items: center !important; justify-content: center !important;
                    font-size: 24px !important;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.6), 0 0 12px var(--cv-glow) !important;
                    cursor: pointer !important; user-select: none !important;
                    border: 2px solid var(--cv-fab-border) !important;
                    transition: border-color 0.2s, box-shadow 0.2s !important;
                }
                .cv-fab:hover { border-color: var(--cv-accent) !important; box-shadow: 0 4px 15px rgba(0,0,0,0.6), 0 0 18px var(--cv-glow) !important; }

                .cv-wrapper.collapsed .cv-fab { display: flex !important; }

                /* Tier icon in header (subscribers) */
                .cv-tier-icon {
                    display: inline-flex; align-items: center; margin-left: 4px;
                }
                .cv-tier-icon svg { width: 16px; height: 16px; fill: #818cf8; filter: drop-shadow(0 0 4px rgba(99, 102, 241, 0.5)); }

                /* PRO label with crown (premium) */
                .cv-pro-label {
                    position: relative; display: inline-flex; align-items: baseline;
                    color: #FFD700; font-size: 10px; font-weight: bold; letter-spacing: 1px;
                    margin-left: 6px; text-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
                }
                .cv-pro-crown {
                    position: absolute; top: -9px; left: -4px;
                    transform: rotate(-18deg);
                }
                .cv-pro-crown svg { width: 14px; height: 14px; stroke: #FFD700; filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.6)); }

                .cv-indicators {
                    display: flex; justify-content: center; gap: 12px;
                    margin-bottom: 10px; font-size: 10px; color: #aaa;
                }
                .cv-indicator {
                    display: inline-flex; align-items: center; gap: 4px;
                }
                .cv-dot {
                    display: inline-block; width: 8px; height: 8px; border-radius: 50%;
                    transition: background-color 0.3s;
                }
                .cv-dot--ok { background-color: #4CAF50; }
                .cv-dot--off { background-color: #666; }
                .cv-dot--error { background-color: #ff5e5e; }

                .cv-sb-btn {
                    display: flex; align-items: center; justify-content: center; gap: 4px;
                    background: #333 !important; color: #fff !important; border: 1px solid #555 !important;
                    padding: 6px 10px !important; border-radius: 6px !important; font-size: 11px !important;
                    cursor: pointer !important; width: 100% !important; transition: 0.2s; margin-bottom: 10px !important;
                    box-sizing: border-box !important;
                }
                .cv-sb-btn:hover { background: #444 !important; }
                .cv-sb-btn.active { border-color: #4CAF50 !important; background: #1b3a1b !important; }
                .cv-sb-btn.disabled {
                    opacity: 0.4 !important; cursor: not-allowed !important; pointer-events: none !important;
                }
            </style>

            <div class="cv-wrapper" id="cv-wrapper">
                <div class="cv-fab" id="cv-fab" title="Expand CrabVoice">🦀</div>
                
                <div class="cv-panel" id="cv-panel">
                    <div class="cv-header" id="cv-header" title="Drag to move">
                        <div style="display:flex;align-items:center;gap:2px;">${headerTitle}</div>
                        <button class="cv-btn-collapse" id="cv-btn-collapse" title="Minimize">${Icons.collapse}</button>
                    </div>
                    <div class="cv-content">
                        <div style="font-size:12px; margin-bottom: 6px; text-align:center;">
                            <span id="cv-status" style="color:#FFC131">${t('panel.searching')}</span>
                        </div>
                        <div class="cv-indicators" id="cv-indicators">
                            <span class="cv-indicator" id="cv-ind-proxy" title="${t('indicator.proxy.off')}"><span class="cv-dot cv-dot--off"></span> Proxy</span>
                            <span class="cv-indicator" id="cv-ind-auth" title="${t('indicator.auth.off')}"><span class="cv-dot cv-dot--off"></span> Auth</span>
                            <span class="cv-indicator" id="cv-ind-sponsorblock" style="display:${this.tier !== 'free' ? 'inline-flex' : 'none'}" title="${t('indicator.sb.off')}"><span class="cv-dot cv-dot--off"></span> SB</span>
                        </div>

                        <div class="cv-row">
                            <label>${t('panel.translation_vol')} <span id="cv-val-audio">100%</span></label>
                            <input type="range" class="cv-slider" id="cv-vol-audio" min="0" max="100" value="100">
                        </div>

                        <div class="cv-row">
                            <label>${t('panel.original_vol')} <span id="cv-val-video">15%</span></label>
                            <input type="range" class="cv-slider" id="cv-vol-video" min="0" max="100" value="15">
                        </div>

                        <button class="cv-sb-btn ${this.tier === 'free' ? 'disabled' : ''} ${this.sponsorBlockEnabled && this.tier !== 'free' ? 'active' : ''}" id="cv-sb-toggle">
                            ${Icons.sponsorblock || '⏭'} ${this.tier === 'free' ? t('panel.sb_na') : (this.sponsorBlockEnabled ? t('panel.sb_on') : t('panel.sb_off'))}
                        </button>
                        ${this.tier !== 'free' ? '<div style="font-size:9px;color:#666;text-align:center;margin-top:-8px;margin-bottom:8px;">(Using <a href="https://sponsor.ajay.app/" target="_blank" style="color:#888;">sponsor.ajay.app</a>)</div>' : ''}

                        <div class="cv-btn-group">
                            <button class="cv-btn" id="cv-toggle-play">${t('panel.pause')}</button>
                            <button class="cv-btn" id="cv-refresh">${Icons.refresh} ${t('panel.refresh')}</button>
                            <button class="cv-btn" id="cv-fullscreen" title="${t('panel.fullscreen')}">⛶</button>
                        </div>

                        <button class="cv-btn-close" id="cv-close-full">${Icons.return} ${t('panel.back')}</button>
                    </div>
                </div>
            </div>
        `;
        this.safeSetHTML(this.shadow, template);

        this.wrapper = this.shadow.getElementById('cv-wrapper')!;
        this.fab = this.shadow.getElementById('cv-fab')!;
        this.statusEl = this.shadow.getElementById('cv-status')!;
        this.valAudio = this.shadow.getElementById('cv-val-audio')!;
        this.valVideo = this.shadow.getElementById('cv-val-video')!;
        this.btnTogglePlay = this.shadow.getElementById('cv-toggle-play')!;
        this.sliderAudio = this.shadow.getElementById('cv-vol-audio') as HTMLInputElement;
        this.sliderVideo = this.shadow.getElementById('cv-vol-video') as HTMLInputElement;
        this.btnSponsorBlock = this.shadow.getElementById('cv-sb-toggle');
    }

    private toggleCollapse(collapsed: boolean) {
        this.isCollapsed = collapsed;
        if (collapsed) {
            this.wrapper.classList.add('collapsed');
        } else {
            this.wrapper.classList.remove('collapsed');
            
            requestAnimationFrame(() => {
                const rect = this.wrapper.getBoundingClientRect();
                const panelWidth = this.wrapper.offsetWidth;
                const panelHeight = this.wrapper.offsetHeight;
                
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;
                
                let newLeft = rect.left;
                let newTop = rect.top;
                
                if (newLeft + panelWidth > screenWidth) {
                    newLeft = screenWidth - panelWidth - 20;
                }
                if (newLeft < 0) {
                    newLeft = 20;
                }
                
                if (newTop + panelHeight > screenHeight) {
                    newTop = screenHeight - panelHeight - 20;
                }
                if (newTop < 0) {
                    newTop = 20;
                }

                this.wrapper.style.setProperty('left', `${newLeft}px`, 'important');
                this.wrapper.style.setProperty('top', `${newTop}px`, 'important');
            });
        }
    }

    private bindEvents() {
        this.shadow.getElementById('cv-close-full')!.onclick = () => this.callbacks.onClose();

        this.shadow.getElementById('cv-btn-collapse')!.onclick = () => this.toggleCollapse(true);
        
        // Клик по крабу для разворачивания
        this.fab.onclick = () => {
            if (this.isCollapsed) this.toggleCollapse(false);
        };

        this.sliderAudio.oninput = (e: any) => {
            const val = e.target.value;
            this.valAudio.innerText = `${val}%`;
            this.callbacks.onAudioVolume(val / 100);
        };

        this.sliderVideo.oninput = (e: any) => {
            const val = e.target.value;
            this.valVideo.innerText = `${val}%`;
            this.callbacks.onVideoVolume(val / 100);
        };

        this.btnTogglePlay.onclick = () => {
            this.translationPaused = !this.translationPaused;
            this.setPlayPauseState(this.translationPaused);
            this.callbacks.onTogglePlay(this.translationPaused);
        };

        this.shadow.getElementById('cv-refresh')!.onclick = () => {
            this.setPlayPauseState(false);
            this.callbacks.onRefresh();
        };

        this.shadow.getElementById('cv-fullscreen')!.onclick = () => this.callbacks.onFullscreen();

        if (this.btnSponsorBlock && this.tier !== 'free') {
            this.btnSponsorBlock.onclick = () => {
                this.sponsorBlockEnabled = !this.sponsorBlockEnabled;
                this.updateSponsorBlockButton();
                this.callbacks.onSponsorBlockToggle(this.sponsorBlockEnabled);
            };
        }
    }

    private setupDraggable() {
        const header = this.shadow.getElementById('cv-header')!;
        let isDragging = false;
        let startX = 0, startY = 0;
        let initialLeft = 0, initialTop = 0;

        // Вспомогательная функция для нормализации координат
        const getCoords = (e: MouseEvent | TouchEvent) => {
            if ('touches' in e) {
                return { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
            return { x: e.clientX, y: e.clientY };
        };

        const onStart = (e: MouseEvent | TouchEvent) => {
            const target = e.target as HTMLElement;
            // Разрешаем драг только за хедер или за сам краб
            if (target !== header && !header.contains(target) && target !== this.fab) return;
            
            // Если это тач, предотвращаем дефолтное поведение (чтобы не скроллить страницу)
            if (e.type === 'touchstart') {
                // Не вызываем preventDefault здесь, чтобы не сломать клики, 
                // но в move будем аккуратнее
            }

            isDragging = true;
            const coords = getCoords(e);
            startX = coords.x;
            startY = coords.y;
            
            const rect = this.wrapper.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;

            this.wrapper.style.setProperty('bottom', 'auto', 'important');
            this.wrapper.style.setProperty('right', 'auto', 'important');
            this.wrapper.style.setProperty('left', `${initialLeft}px`, 'important');
            this.wrapper.style.setProperty('top', `${initialTop}px`, 'important');

            // Вешаем события
            document.addEventListener('mousemove', onMove);
            document.addEventListener('touchmove', onMove, { passive: false });
            document.addEventListener('mouseup', onEnd);
            document.addEventListener('touchend', onEnd);
        };

        const onMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging) return;
            
            // Важно для тача: предотвращаем скролл страницы во время перетаскивания
            if (e.type === 'touchmove') e.preventDefault();

            const coords = getCoords(e);
            let newLeft = initialLeft + (coords.x - startX);
            let newTop = initialTop + (coords.y - startY);
            
            const maxLeft = window.innerWidth - this.wrapper.offsetWidth;
            const maxTop = window.innerHeight - this.wrapper.offsetHeight;

            this.wrapper.style.setProperty('left', `${Math.max(0, Math.min(newLeft, maxLeft))}px`, 'important');
            this.wrapper.style.setProperty('top', `${Math.max(0, Math.min(newTop, maxTop))}px`, 'important');
        };

        const onEnd = () => {
            isDragging = false;
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('mouseup', onEnd);
            document.removeEventListener('touchend', onEnd);
        };

        // Слушаем и мышь, и тач
        header.addEventListener('mousedown', onStart);
        header.addEventListener('touchstart', onStart, { passive: false });
        this.fab.addEventListener('mousedown', onStart);
        this.fab.addEventListener('touchstart', onStart, { passive: false });
    }

    public updateStatus(text: string, color: string = '#fff') {
        this.statusEl.innerText = text;
        this.statusEl.style.color = color;
    }

    public setVideoVolumeSlider(val: number) {
        this.sliderVideo.value = (val * 100).toString();
        this.valVideo.innerText = `${Math.round(val * 100)}%`;
    }
    
    public setPlayPauseState(paused: boolean) {
        this.translationPaused = paused;
        this.btnTogglePlay.innerText = paused ? t('panel.play') : t('panel.pause');
    }

    private updateSponsorBlockButton() {
        if (!this.btnSponsorBlock || this.tier === 'free') return;
        const icon = Icons.sponsorblock || '⏭';
        if (this.sponsorBlockEnabled) {
            this.btnSponsorBlock.classList.add('active');
            this.safeSetHTML(this.btnSponsorBlock, `${icon} ${t('panel.sb_on')}`);
        } else {
            this.btnSponsorBlock.classList.remove('active');
            this.safeSetHTML(this.btnSponsorBlock, `${icon} ${t('panel.sb_off')}`);
        }
    }

    public setSponsorBlockState(enabled: boolean) {
        this.sponsorBlockEnabled = enabled;
        this.updateSponsorBlockButton();
    }

    public updateIndicator(id: IndicatorId, status: IndicatorStatus) {
        const el = this.shadow.getElementById(`cv-ind-${id}`);
        if (!el) return;
        const dot = el.querySelector('.cv-dot');
        if (dot) {
            dot.className = `cv-dot cv-dot--${status}`;
        }
        const tooltipKey = id === 'sponsorblock' ? `indicator.sb.${status}` : `indicator.${id}.${status}`;
        el.title = t(tooltipKey);
    }
}