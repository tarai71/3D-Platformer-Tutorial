#pragma strict

function Start () {

}

function Update () {

}

function LateUpdate ()
{
	if (!audio.isPlaying || Input.anyKeyDown)
		Application.LoadLevel("StartMenu");
}