/*global SETV,GAME*/
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //SETV.load();


    //game resolution
    //var w = 512;
    //var h = 512;
    getSettings();
    var w = parseFloat(document.getElementById('resolution').value);
    var h = parseFloat(document.getElementById('resolution').value);




    var glv = new SETV.GLV('canvas', w, h, false);


    var helpers = new SETV.Helpers();

    //handles keyboard and mouse input
    var actionMapper = new SETV.ActionMapper(glv);
    //general helpers, mostly game related

    //contains all loaded assets after state is initialized
    var assetManager = new SETV.AssetManager();
    //Entity is the vaquest term for game objects
    var entity = SETV.Entity;

    //Shaders etc
    var material = new SETV.Material(glv,assetManager,helpers);
    //Handles camera movement and positioning
    var camera = new SETV.Camera(glv,w, h);
    //creates and manages entities
    var entityManager = new SETV.EntityManager(entity);
    //text holds the letter meta that connects positions to bitmap
    var text = new SETV.Text(glv,helpers);


    //music and effects
    var audio = new SETV.Audio(assetManager);


    //in the internet we will start the music off
    //audio.useSound(0);
    if (document.getElementById('soundtoggle').className === 'soundon') {
        audio.useSound(1);
    }
    else {
        audio.useSound(9);
    }



    audio.setEffectsVolume(parseFloat(document.getElementById('effectsVolume').value));
    audio.setMusicVolume(parseFloat(document.getElementById('musicVolume').value));
    audio.setMasterVolume(parseFloat(document.getElementById('masterVolume').value));

    //VOLUME CONTROLS
    //TODO: create opengl gui for these
    document.getElementById('soundtoggle').onclick = function() {
        var e = document.getElementById('soundtoggle');

        if (e.className === 'soundon') {
            e.className = 'soundoff';
            audio.useSound(0);
        }
        else {
            e.className = 'soundon';
            audio.useSound(1);
        }
    };
    //master volume slider
    document.getElementById('masterVolume').onchange = function(e) {
        audio.setMasterVolume(parseFloat(this.value));
    };
    //music volume slider
    document.getElementById('musicVolume').onchange = function(e) {
        audio.setMusicVolume(parseFloat(this.value));
    };
    //effect volume slider
    document.getElementById('effectsVolume').onchange = function(e) {
        audio.setEffectsVolume(parseFloat(this.value));
    };







    var processlist = [];
    processlist.push(new SETV.CollisionProcess(entityManager, helpers));
    processlist.push(new SETV.FPSCameraControllerProcess(camera));
    processlist.push(new GAME.LayoutProcess());
    processlist.push(new SETV.RenderProcess(glv, camera, material,assetManager));
    processlist.push(new GAME.ScoreProcess(text,entityManager));
    processlist.push(new GAME.ShieldProcess(glv,entityManager,camera));
    processlist.push(new GAME.ShipMovementProcess(entityManager));
    processlist.push(new GAME.SteeringProcess());
    processlist.push(new GAME.TeleportProcess(glv,entityManager,material,camera,helpers));
    processlist.push(new SETV.Text2DProcess(glv,material,text,camera,assetManager));
    processlist.push(new SETV.Text3DProcess(glv,camera,material,assetManager,text));

    var renderer = new SETV.MeshRenderer(glv, camera, material, assetManager);

    var gamestate = new GAME.GameState(glv, processlist,entityManager,camera,actionMapper,audio,material,renderer);


    //we pass the states to statemanager that handles changes
    var states = {
        'game': gamestate
    };


    var loader = new SETV.Loader(glv, assetManager, entityManager, material,audio,text);
    var StateEngine = new SETV.StateEngine(states, loader,audio);
    //stateEngine.init(states);
    StateEngine.loadStage('game');











    //core for some injections
    //can do without in the future perhaps
    //var S = SETV().init();
    //var helpf = SETV.helpers();
    //var pubsub = new SETV.PubSub();

    //var glv = SETV.glv();

    //var gl = CORE.getGL();

    //handles entity creation
    //var em = SETV.entityManager();

    //var glv = SETV.glv('canvas',true).init();

    //assetmanager for mesh and textures
    //texture loading
    //var tc = new Texture(gl,pubsub);
    //var mesh = mesh(gl,pubsub);
    //var am = assetManager(pubsub, mesh, tc);

    //CORE.setEntityManagerModule(em);

    //CORE.setAssetManagerModule(am);
    //CORE.setActionMapperModule(actionMapper(pubsub));
    //CORE.setCameraModule(camera(w, h, helpf));
    //CORE.setTextModule(text(w, h, helpf));

    //CORE.setMaterialModule(material(gl, am));

    //CORE.setEntityCreatorModule(entityCreator(gl, em, am, helpf));
    //CORE.setAudioModule(audio(helpf));

    //CORE.startModules(function() {

    //after modules have been started we start
    //audio off
    //some initial volumes
    //CORE.getAudio().useSound(0);
    //CORE.getAudio().setEffectsVolume(parseFloat(document.getElementById('effectsVolume').value));
    //CORE.getAudio().setMusicVolume(parseFloat(document.getElementById('musicVolume').value));
    //CORE.getAudio().setMasterVolume(parseFloat(document.getElementById('masterVolume').value));

    //gamestate processlist
    //order matters because minimizing shader changes is preferred
    // var processlist = [];

    //gSP.push(gameLogicProcess(CORE, pubsub));

    //gSP.push(chaseProcess(CORE));
    //gSP.push(faceProcess(CORE));

    //gSP.push(movementProcess(CORE, pubsub, helpf));

    //gSP.push(trailProcess(CORE, helpf));
    //gSP.push(collisionProcess(CORE, pubsub, helpf));
    //gSP.push(timedTextProcess(CORE));
    //gSP.push(scoreProcess(CORE));

    //gSP.push(textProcess(CORE));
    //gSP.push(starProcess(CORE));

    //simplest shader
    //gSP.push(teleportProcess(CORE, helpf));
    //gSP.push(laserProcess(CORE, pubsub, helpf));
    //gSP.push(primitiveProcess(CORE));

    //gui shader
    // gSP.push(text2dProcess(CORE));
    //gSP.push(layoutProcess(CORE));



    //gSP.push(cameraControllerProcess(CORE, pubsub));
    //gSP.push(planeProcess(CORE));
    //gSP.push(pulseGunProcess(CORE, pubsub, helpf));

    //gSP.push(shieldProcess(CORE));

    //gSP.push(postProcess(CORE));

    //game state processes that don't pause when pause is pressed
    //var gSPNoPause = [];
    //gSPNoPause.push(explosionProcess(CORE, pubsub));
    //gSPNoPause.push();
    //gSPNoPause.push(pauseProcess(CORE));

    //load state processes
    //var lSP = [];
    //lSP.push(renderProcess(CORE, helpf));
    //lSP.push(menuProcess(CORE, pubsub));
    //var hg = hexagon(4);
    //lSP.push(levelupProcess(CORE, hg));

    //lSP.push(starMoveProcess(CORE));

    //intro state processes
    //var iSP = [];
    //iSP.push(renderProcess(CORE, helpf));
    //iSP.push(menuProcess(CORE, pubsub));

    //we pass the states to statemanager that handles changes
    //var states = {
    //  'gamestate': gameState(processlist)
    //'introstate': introState(CORE, iSP),
    //'levelupstate': levelupState(CORE, lSP)

    //};

    //loader(pubsub, CORE.getAssetManager(),CORE.getEntityCreator(), CORE.getEntityManager()).init();

    //we start with one of the states
    //SETV.stateEngine(states ).init('gamestate');

//});
    /*
     //VOLUME CONTROLS
     //TODO: create opengl gui for these
     document.getElementById('soundtoggle').onclick = function() {
     var e = document.getElementById('soundtoggle');

     if (e.className === 'soundon') {
     e.className = 'soundoff';
     CORE.getAudio().useSound(0);

     }
     else {
     e.className = 'soundon';
     CORE.getAudio().useSound(1);
     }
     };

     document.getElementById('masterVolume').onchange = function(e) {

     CORE.getAudio().setMasterVolume(parseFloat(this.value));
     };
     document.getElementById('musicVolume').onchange = function(e) {

     CORE.getAudio().setMusicVolume(parseFloat(this.value));
     };

     document.getElementById('effectsVolume').onchange = function(e) {

     CORE.getAudio().setEffectsVolume(parseFloat(this.value));
     };
     */
    // }
    //catch (err) {
    //    throw err;
    //var err = new Error();
    //   console.log(err.stack);
    //}

});


document.getElementById("options").addEventListener("click", function(){
    event.stopPropagation();
    document.getElementById("options").style.right = 0;
});

document.body.addEventListener("click", function(){
    document.getElementById("options").style.right = -380;
});


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
document.getElementById('saveResolution').addEventListener('click', setSettings);

function getSettings() {
    var settings = getCookie("settings");
    var splitSettins = settings.split('|');

    if(splitSettins.length!==6) {
        return false;
    }


    document.getElementById('masterVolume').value = splitSettins[0];
    document.getElementById('effectsVolume').value = splitSettins[1];
    document.getElementById('musicVolume').value = splitSettins[2];
    document.getElementById('resolution').value = splitSettins[3];


    if(splitSettins[4] ==='1') {
        document.getElementById('soundtoggle').className = 'soundon';
    }
    else {
        document.getElementById('soundtoggle').className = 'soundoff';
    }

}

function setSettings() {


    var options = {};
    options.masterVolume = parseFloat(document.getElementById('masterVolume').value);
    options.effectsVolume = parseFloat(document.getElementById('effectsVolume').value);
    options.musicVolume = parseFloat(document.getElementById('musicVolume').value);
    options.resolution = parseFloat(document.getElementById('resolution').value);
    if(document.getElementById('soundtoggle').className === 'soundon') {
        options.soundOn = 1;
    }
    else {
        options.soundOn = 0;
    }

    var str ='';
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            str += options[key]+'|';
        }
    }
    setCookie("settings", str, 365);
    location.reload();

}
