//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

// window["TaskGroup"] = TaskGroup;

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();
        let self = this;
        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        self.initData();
        ext.loadServerConfig(() => {
            self.initPlatform();
        })
    }

    /** 初始化数据 */
    private initData(): void {
        let self = this;
        //允许支持跨域加载图片
        egret.ImageLoader.crossOrigin = "anonymous";
        StageUtils.getInstance.setup(self.stage);
        LayerManager.getInstance.setup(self.stage);
        StageUtils.setFrameRate(30);
        GameConfig.IsMobile = egret.Capabilities.isMobile;
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
            this.stage.orientation = egret.OrientationMode.PORTRAIT;
            StageUtils.setScaleMode(egret.StageScaleMode.EXACT_FIT);
        }
        else {
            if (GameConfig.systemType() == "windows") {
                this.stage.orientation = egret.OrientationMode.AUTO;
                StageUtils.setScaleMode(egret.StageScaleMode.SHOW_ALL);
            }
            else {
                this.stage.orientation = egret.OrientationMode.PORTRAIT;
                StageUtils.setScaleMode(egret.StageScaleMode.SHOW_ALL);
            }
        }
    }

    private initPlatform() {
        let self = this;
        PathManager.Instance.resourceUrl = ext.getResourceUrl();
        self.loadConfigs();
    }

    /** 加载配置文件 */
    private async loadConfigs() {
        let configs: Array<string> = PathManager.Instance.ConfigUrls;
        for (let i: number = 0; i < configs.length; i++) {
            ResUtil.getInstance.addConfig(configs[i], PathManager.Instance.resourceUrl);
        }
        ResUtil.getInstance.loadConfig(this.loadLoadingResource, this);
    }

    /** 配置文件加载完毕 */
    private loadLoadingResource(): void {
        let self = this;
        ResUtil.getInstance.loadGroup(["game"], () => {
            // GlobleData.getInstance.setup(() => {
                self.loadTheme();
            // });
        }, self);
    }

    private loadTheme() {
        let theme: eui.Theme = new eui.Theme(PathManager.Instance.ThemePath, this.stage);
        var loadLan = () => {
            var startShowScene = (data: string, url: string) => {
                LanguageManager.getInstance.setup(data);
            }
            this.createGameScene();
            RES.getResByUrl(PathManager.Instance.language_path, startShowScene, this, RES.ResourceItem.TYPE_TEXT);
        }
        theme.addEventListener(eui.UIEvent.COMPLETE, loadLan, this);
    }

    /** 创建场景界面 */
    protected createGameScene(): void {
        let self = this;
        if (egret.Capabilities.runtimeType != egret.RuntimeType.WXGAME) {
            document.getElementById("preloading").style.display = "none";
            document.getElementById("circleId").style.display = "none";
        }
        LoginManager.getInstance.setup();
        if (ext.getPlatform() == "dev") {
            ScenesManager.getInstance.openView(UIUtil.createScene(ViewClassName.LoginView), LayerManager.GAME_MAP_LAYER, true);
        }
        else {
        }
    }
}
