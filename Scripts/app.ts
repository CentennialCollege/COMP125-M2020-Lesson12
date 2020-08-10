(function(){
    // Function scoped Variables
    let stage: createjs.Stage;
    let helloLabel: UIObjects.Label;
    let clickMeButton: UIObjects.Button;
    let assets: createjs.LoadQueue;


    // This function triggers first and "Preloads" all the assets
    function Preload()
    {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);

        assets.loadManifest([
            {id:"clickMeButton", src:"./Assets/images/ClickMeButton.png"}
        ]);
    }

    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start():void
    {
        console.log("App Started...");
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);

        stage.enableMouseOver(20);

        Config.Globals.AssetManifest = assets;

        Main();
    }

    // called every frame
    function Update():void
    {
        //helloLabel.rotation -= 5;

        stage.update();
    }

    // app logic goes here
    function Main():void
    {
        // label
        helloLabel = new UIObjects.Label("Holla, Mundo!", "60px", "Consolas", "#000000", 320, 240, true);
        stage.addChild(helloLabel);

        // button
        clickMeButton = new UIObjects.Button("clickMeButton", 320, 340, true);
        stage.addChild(clickMeButton);

        clickMeButton.on("click", ()=>{
            if(helloLabel.text == "Adios, mundo cruel!")
            {
                helloLabel.setText("Holla, Mundo!");
            }
            else
            {
                helloLabel.setText("Adios, mundo cruel!");
            }
        });

       
    }

    window.addEventListener("load", Preload);
})();