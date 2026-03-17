import { Icons } from "./icons"; 

export interface PanelCallbacks {
    onClose: () => void;
    onAudioVolume: (val: number) => void;
    onVideoVolume: (val: number) => void;
    onTogglePlay: (paused: boolean) => void;
    onRefresh: () => void;
}

export class CrabPanel {
    public host: HTMLElement;
    private shadow: ShadowRoot;
    private translationPaused = false;
    private isCollapsed = false;

    // UI Элементы
    private wrapper!: HTMLElement;
    private fab!: HTMLElement;
    private statusEl!: HTMLElement;
    private valAudio!: HTMLElement;
    private valVideo!: HTMLElement;
    private btnTogglePlay!: HTMLElement;
    private sliderAudio!: HTMLInputElement;
    private sliderVideo!: HTMLInputElement;

    constructor(private callbacks: PanelCallbacks) {
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

    private render() {
        const template = `
            <style>
                .cv-wrapper {
                    position: fixed !important; bottom: 20px !important; right: 20px !important;
                    z-index: 2147483647 !important; font-family: sans-serif !important; 
                    pointer-events: auto !important; color: #fff !important;
                }
                
                .cv-panel {
                    background: rgba(0,0,0,0.85) !important; border-radius: 10px !important;
                    min-width: 220px !important; box-shadow: 0 4px 15px rgba(0,0,0,0.6) !important;
                    display: flex !important; flex-direction: column !important;
                }
                
                .cv-wrapper.collapsed .cv-panel { display: none !important; }

                .cv-header { 
                    font-size: 14px !important; font-weight: bold; background: #2a2a2a !important;
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
                .cv-slider { width: 100% !important; accent-color: #24c8db !important; cursor: pointer; }
                .cv-btn-group { display: flex !important; gap: 8px !important; margin-bottom: 10px !important; }
                .cv-btn {
                    background: #333 !important; color: #fff !important; border: 1px solid #555 !important;
                    padding: 6px 10px !important; border-radius: 6px !important; font-size: 12px !important;
                    cursor: pointer !important; flex: 1 !important; transition: 0.2s;
                }
                .cv-btn:hover { background: #444 !important; }
                .cv-btn-close {
                    background: #ff5e5e !important; color: #fff !important; border: none !important;
                    padding: 8px 15px !important; border-radius: 6px !important; font-weight: bold !important;
                    cursor: pointer !important; width: 100% !important; font-size: 13px !important;
                }

                .cv-fab {
                    display: none !important; width: 48px !important; height: 48px !important;
                    background: rgba(0,0,0,0.85) !important; border-radius: 24px !important;
                    align-items: center !important; justify-content: center !important;
                    font-size: 24px !important; box-shadow: 0 4px 15px rgba(0,0,0,0.6) !important;
                    cursor: pointer !important; user-select: none !important; border: 2px solid #444 !important;
                    transition: border-color 0.2s !important;
                }
                .cv-fab:hover { border-color: #24c8db !important; }
                
                .cv-wrapper.collapsed .cv-fab { display: flex !important; }
            </style>

            <div class="cv-wrapper" id="cv-wrapper">
                <div class="cv-fab" id="cv-fab" title="Expand CrabVoice">🦀</div>
                
                <div class="cv-panel" id="cv-panel">
                    <div class="cv-header" id="cv-header" title="Drag to move">
                        <div>🦀 CrabVoice</div>
                        <button class="cv-btn-collapse" id="cv-btn-collapse" title="Minimize">${Icons.collapse}</button>
                    </div>
                    <div class="cv-content">
                        <div style="font-size:12px; margin-bottom: 12px; text-align:center;">
                            <span id="cv-status" style="color:#FFC131">Searching video...</span>
                        </div>
                        
                        <div class="cv-row">
                            <label>Translation Vol: <span id="cv-val-audio">100%</span></label>
                            <input type="range" class="cv-slider" id="cv-vol-audio" min="0" max="100" value="100">
                        </div>
                        
                        <div class="cv-row">
                            <label>Original Vol: <span id="cv-val-video">15%</span></label>
                            <input type="range" class="cv-slider" id="cv-vol-video" min="0" max="100" value="15">
                        </div>

                        <div class="cv-btn-group">
                            <button class="cv-btn" id="cv-toggle-play">⏸ Pause</button>
                            <button class="cv-btn" id="cv-refresh">🔄 Refresh</button>
                        </div>

                        <button class="cv-btn-close" id="cv-close-full">⬅ Back to App</button>
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
    }

    private toggleCollapse(collapsed: boolean) {
        this.isCollapsed = collapsed;
        if (collapsed) {
            this.wrapper.classList.add('collapsed');
        } else {
            this.wrapper.classList.remove('collapsed');
            
            // Ждем завершения отрисовки (пока CSS применит display: flex), 
            // чтобы получить корректные размеры новой панели
            requestAnimationFrame(() => {
                const rect = this.wrapper.getBoundingClientRect();
                const panelWidth = this.wrapper.offsetWidth;
                const panelHeight = this.wrapper.offsetHeight;
                
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;
                
                let newLeft = rect.left;
                let newTop = rect.top;
                
                // Горизонтальные границы
                if (newLeft + panelWidth > screenWidth) {
                    newLeft = screenWidth - panelWidth - 20; // 20px отступ от края
                }
                if (newLeft < 0) {
                    newLeft = 20;
                }
                
                // Вертикальные границы
                if (newTop + panelHeight > screenHeight) {
                    newTop = screenHeight - panelHeight - 20; // 20px отступ от края
                }
                if (newTop < 0) {
                    newTop = 20;
                }

                // Применяем вычисленные координаты
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
    }

    private setupDraggable() {
        const header = this.shadow.getElementById('cv-header')!;
        let isDragging = false;
        let startX = 0, startY = 0;
        let initialLeft = 0, initialTop = 0;

        const onMouseDown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            
            // Проверяем: клик был по хедеру (или внутри него) ИЛИ по крабику.
            // И исключаем клик по кнопкам внутри хедера
            const isButton = target.tagName.toLowerCase() === 'button';
            const isHeaderArea = header.contains(target);
            const isFab = target === this.fab;

            if (isButton || (!isHeaderArea && !isFab)) return;
            
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            
            const rect = this.wrapper.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;

            this.wrapper.style.setProperty('bottom', 'auto', 'important');
            this.wrapper.style.setProperty('right', 'auto', 'important');
            this.wrapper.style.setProperty('left', `${initialLeft}px`, 'important');
            this.wrapper.style.setProperty('top', `${initialTop}px`, 'important');

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            let newLeft = initialLeft + (e.clientX - startX);
            let newTop = initialTop + (e.clientY - startY);
            
            const maxLeft = window.innerWidth - this.wrapper.offsetWidth;
            const maxTop = window.innerHeight - this.wrapper.offsetHeight;

            this.wrapper.style.setProperty('left', `${Math.max(0, Math.min(newLeft, maxLeft))}px`, 'important');
            this.wrapper.style.setProperty('top', `${Math.max(0, Math.min(newTop, maxTop))}px`, 'important');
        };

        const onMouseUp = () => {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        header.addEventListener('mousedown', onMouseDown);
        this.fab.addEventListener('mousedown', onMouseDown);
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
        this.btnTogglePlay.innerText = paused ? "▶️ Play" : "⏸ Pause";
    }
}