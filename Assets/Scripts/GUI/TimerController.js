// GameHUD: Platformer Tutorial Master GUI script.

// This script handles the in-game HUD, showing the lives, number of fuel cells remaining, etc.

var countDownScale = 1f;
private var countDownTimer = 3f;
private var attackTimer = 0f;
private var isEnable = false;

private var playerControll : ThirdPersonController;


function GetAttackTime() : float
{
	return attackTimer;
}

function GetCountDown() : float
{
	return countDownTimer / countDownScale;
}

function StartTimer()
{
	isEnable = true;
}

function StopTimer()
{
	isEnable = false;
}

// Cache link to player's state management script for later use.
function Awake()
{
	playerControll = FindObjectOfType(ThirdPersonController);
	if (!playerControll)
		Debug.Log("No link to player controller.");
	
}

function Start()
{
	countDownTimer = 3.99f * countDownScale;
	attackTimer = 0f;

	if(Application.loadedLevelName == "TimeAttack")
	{
		playerControll.Update();
		playerControll.SetControllable(false);
	}
}

function Update()
{
	if(isEnable)
	{
		countDownTimer -= Time.deltaTime;
		if(countDownTimer < 0f)
		{
			playerControll.SetControllable(true);
			countDownTimer = 0f;
			attackTimer += Time.deltaTime;
		}
	}
}

