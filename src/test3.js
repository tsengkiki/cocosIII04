
var Test3Layer = cc.Layer.extend({
    bg:null,
    isRight:true,//鍵盤事件向右（true）或向左(false)
    man:null,//人物玩家
    manFrams:null,
    manAction:0,
    ctor:function () {

        this._super();
        var size = cc.winSize;

        this.bg = new cc.Sprite(res.bg1_png);
        this.bg.attr({
            x: this.bg.width /2,
            y: size.height/2
        });
        this.addChild(this.bg);
        this.bg.scaleY = 2;
        //呼叫綁鍵盤事件

        //系統快取先存人物圖片,為動畫先做準備
        var cache = cc.spriteFrameCache;
        cache.addSpriteFrames(res.man_plist, res.man_png);
        var img37 =cache.getSpriteFrame('image37.png');
        var img38 =cache.getSpriteFrame('image38.png');
        var img39 =cache.getSpriteFrame('image39.png');
        var img40 =cache.getSpriteFrame('image40.png');
        this.manFrams = [img37,img38,img39,img38,img40,img38];

        //做人物精靈
        this.man = new cc.Sprite(this.manFrams[this.manAction]);
        cc.log(this.man.height);
        this.man.attr({
            x:size.width/2,
            y:size.height/2+this.man.height/2
        });
        this.addChild(this.man);
        //人物圖片Ｘ軸翻轉
        this.man.runAction(cc.flipX(this.isRight));


        this.myKeyListener(this);

        return true;
    },

    //綁鍵盤事件，玩家往右走＝背景向左移動
    myKeyListener : function(layer){
        cc.eventManager.addListener({
            event:cc.EventListener.KEYBOARD,
            onKeyPressed :function (keyCode,event) {
                cc.log(keyCode);
                switch(keyCode){
                    case 39: //右＝39
                        if(!layer.isRight){
                            layer.changeDirect();
                        }
                        layer.goForwardBg();
                        break;
                    case 37: //左＝37
                        if(layer.isRight){
                            layer.changeDirect();
                        }
                        layer.goBackBg();
                        break;
                }
            },
        },this);
    },

    //人物改變方向
    changeDirect:function(){
      this.isRight =!this.isRight;
      this.man.runAction(cc.flipX(this.isRight));
    },

    //向前跑＝鍵盤往右按＝背景往左跑
    goForwardBg:function(){
        if (this.bg.x +this.bg.width/2 > cc.winSize.width){
            this.bg.x -= 8;
        }
        this.manAction = this.manAction == 5?0:this.manAction+1;
        this.man.setSpriteFrame(this.manFrams[this.manAction]);
    },

    goBackBg:function(){
        if (this.bg.x -this.bg.width/2 < 0){
            this.bg.x += 8;
        }
        this.manAction = this.manAction == 5?0:this.manAction+1;
        this.man.setSpriteFrame(this.manFrams[this.manAction]);
    },
});

var Test3Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test3Layer();
        this.addChild(layer);
    }
});

