// LevelStatus: Master level state machine script.

var exitGateway: GameObject;
var levelGoal: GameObject;
var unlockedSound: AudioClip;
var levelCompleteSound: AudioClip;
var mainCamera: GameObject;
var unlockedCamera: GameObject;
var levelCompletedCamera: GameObject;

// This is where info like the number of items the player must collect in order to complete the level lives.

var itemsNeeded: int = 20;	// This is how many fuel canisters the player must collect.

private var playerLink: GameObject;

// Awake(): Called by Unity when the script has loaded.
// We use this function to initialise our link to the Lerpz GameObject.
function Awake()
{
	levelGoal.GetComponent(MeshCollider).isTrigger = false;
	playerLink = GameObject.Find("Player");
	if (!playerLink)
		Debug.Log("Could not get link to Lerpz");
	levelGoal.GetComponent(MeshCollider).isTrigger = false; // make very sure of this!
}	

function UnlockLevelExit()
{
	mainCamera.GetComponent(AudioListener).enabled = false;
	
	unlockedCamera.active = true;
	unlockedCamera.GetComponent(AudioListener).enabled = true;
	
	if (unlockedSound)
	{
		AudioSource.PlayClipAtPoint(unlockedSound, unlockedCamera.GetComponent(Transform).position, 2.0);
	}
	
	yield WaitForSeconds(1);
	
	exitGateway.active = false;	// ... フェンスが消灯します
	
	yield WaitForSeconds(0.2);	//... 一瞬停止します...
	exitGateway.active = true;	//...フェンスが再び点灯します...
	yield WaitForSeconds(0.2);	//... 一瞬停止します...
	exitGateway.active = false;	//... フェンスは永久に消え去ります！

	levelGoal.GetComponent(MeshCollider).isTrigger = true;
	
	yield WaitForSeconds(4); // give the player time to see the result.

	// swap the cameras back.
	unlockedCamera.active = false; // this lets the NearCamera get the screen all to itself.
	unlockedCamera.GetComponent(AudioListener).enabled = false;
	mainCamera.GetComponent(AudioListener).enabled = true;
}

function LevelCompleted()
{
	mainCamera.GetComponent(AudioListener).enabled = false;
	levelCompletedCamera.active = true;
	levelCompletedCamera.GetComponent(AudioListener).enabled = true;

	playerLink.GetComponent(ThirdPersonController).SendMessage("HidePlayer");
	playerLink.transform.position+=Vector3.up*500.0; // just move him 500 units
	
	if (levelCompleteSound)
	{
		AudioSource.PlayClipAtPoint(levelCompleteSound, levelGoal.transform.position, 2.0);
	}
	
	levelGoal.animation.Play();
	yield WaitForSeconds (levelGoal.animation.clip.length);
	
	Application.LoadLevel("GameOver"); //...just show the Game Oversequence.
}