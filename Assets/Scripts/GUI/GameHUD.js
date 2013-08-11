// GameHUD: Platformer Tutorial Master GUI script.

// This script handles the in-game HUD, showing the lives, number of fuel cells remaining, etc.

var style: GUIStyle;
var style2: GUIStyle;
var guiSkin: GUISkin;
var nativeVerticalResolution = 1200.0;

// main decoration textures:
var healthImage: Texture2D;
var healthImageOffset = Vector2(0, 0);

// the health 'pie chart' assets consist of six textures with alpha channels. Only one is ever shown:
var healthPieImages : Texture2D[];
var healthPieImageOffset = Vector2(10, 147);

// the lives count is displayed in the health image as a text counter
var livesCountOffset = Vector2(425, 160);

// The fuel cell decoration image on the right side
var fuelCellsImage: Texture2D;
var fuelCellOffset = Vector2(0, 0);

// The counter text inside the fuel cell image
var fuelCellCountOffset = Vector2(391, 161);

var timerOffset = Vector2(300, 0);

private var playerInfo : ThirdPersonStatus;
private var timerInfo : TimerController;

// Cache link to player's state management script for later use.
function Awake()
{
	playerInfo = FindObjectOfType(ThirdPersonStatus);
	if (!playerInfo)
		Debug.Log("No link to player's state manager.");

	if(Application.loadedLevelName == "TimeAttack")
	{
		timerInfo = FindObjectOfType(TimerController); 
		if (!timerInfo)
			Debug.Log("No link to timer info");
	}
}

function Start()
{
	if(Application.loadedLevelName == "TimeAttack")
	{
		if(timerInfo)
		{
			timerInfo.StartTimer();
		}
	}
}

function OnGUI ()
{
	var itemsLeft = playerInfo.GetRemainingItems();	// fetch items remaining -- the fuel cans. This can be a negative number!

	// Similarly, health needs to be clamped to the number of pie segments we can show.
	// We also need to check it's not negative, so we'll use the Mathf Clamp() function:
	var healthPieIndex = Mathf.Clamp(playerInfo.health, 0, healthPieImages.length);

	// Displays fuel cans remaining as a number.	
	// As we don't want to display negative numbers, we clamp the value to zero if it drops below this:
	if (itemsLeft < 0)
		itemsLeft = 0;

	// Set up gui skin
	GUI.skin = guiSkin;

	// Our GUI is laid out for a 1920 x 1200 pixel display (16:10 aspect). The next line makes sure it rescales nicely to other resolutions.
	GUI.matrix = Matrix4x4.TRS (Vector3(0, 0, 0), Quaternion.identity, Vector3 (Screen.height / nativeVerticalResolution, Screen.height / nativeVerticalResolution, 1)); 

	// Health & lives info.
	DrawImageTopAligned( healthImageOffset, healthImage); // main image.

	// now for the pie chart. This is where a decent graphics package comes in handy to check relative sizes and offsets.
	var pieImage = healthPieImages[healthPieIndex-1];
	DrawImageTopAligned( healthPieImageOffset, pieImage );
	
	// Displays lives left as a number.	
	DrawLabelTopAligned( livesCountOffset, playerInfo.lives.ToString() );	
	
	// Now it's the fuel cans' turn. We want this aligned to the lower-right corner of the screen:
	DrawImageTopRightAligned( fuelCellOffset, fuelCellsImage);

	DrawLabelTopRightAligned( fuelCellCountOffset, itemsLeft.ToString() );

	if(Application.loadedLevelName == "TimeAttack")
	{
		if(timerInfo)
		{
			var scaledResolutionWidth = nativeVerticalResolution / Screen.height * Screen.width;
			
			DrawLabelTopAligned( timerOffset, "Time : " + Mathf.Round(timerInfo.GetAttackTime()*100)/100 );
			if(!timerInfo.GetEnable())
			{
				GUI.Label(Rect (scaledResolutionWidth/2f-120f, nativeVerticalResolution/2f-120f, 300f, 300f), "" + Mathf.Round(timerInfo.GetAttackTime()*100)/100, style2 );
			}
			
			if(timerInfo.GetCountDown() > 0f)
			{
				if(parseInt(timerInfo.GetCountDown()) > 0)
				{
					GUI.Label(Rect (scaledResolutionWidth/2f-120f, nativeVerticalResolution/2f-120f, 300f, 300f), parseInt(timerInfo.GetCountDown()).ToString(), style);
				}
				else
				{
					GUI.Label(Rect (scaledResolutionWidth/2f-120f, nativeVerticalResolution/2f-120f, 300f, 300f), "GO!", style);
				}
			}
		}
	}
}

function DrawImageBottomAligned (pos : Vector2, image : Texture2D)
{
	GUI.Label(Rect (pos.x, nativeVerticalResolution - image.height - pos.y, image.width, image.height), image);
}

function DrawLabelBottomAligned (pos : Vector2, text : String)
{
	GUI.Label(Rect (pos.x, nativeVerticalResolution - pos.y, 100, 100), text);
}

function DrawImageBottomRightAligned (pos : Vector2, image : Texture2D)
{
	var scaledResolutionWidth = nativeVerticalResolution / Screen.height * Screen.width;
	GUI.Label(Rect (scaledResolutionWidth - pos.x - image.width, nativeVerticalResolution - image.height - pos.y, image.width, image.height), image);
}

function DrawLabelBottomRightAligned (pos : Vector2, text : String)
{
	var scaledResolutionWidth = nativeVerticalResolution / Screen.height * Screen.width;
	GUI.Label(Rect (scaledResolutionWidth - pos.x, nativeVerticalResolution - pos.y, 100, 100), text);
}

function DrawImageTopAligned (pos : Vector2, image : Texture2D)
{
	GUI.Label(Rect (pos.x, pos.y, image.width, image.height), image);
}

function DrawLabelTopAligned (pos : Vector2, text : String)
{
	GUI.Label(Rect (pos.x, pos.y, 400, 100), text);
}

function DrawImageTopRightAligned (pos : Vector2, image : Texture2D)
{
	var scaledResolutionWidth = nativeVerticalResolution / Screen.height * Screen.width;
	GUI.Label(Rect (scaledResolutionWidth - pos.x - image.width, pos.y, image.width, image.height), image);
}

function DrawLabelTopRightAligned (pos : Vector2, text : String)
{
	var scaledResolutionWidth = nativeVerticalResolution / Screen.height * Screen.width;
	GUI.Label(Rect (scaledResolutionWidth - pos.x, pos.y, 100, 100), text);
}