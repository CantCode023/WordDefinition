const button = document.querySelector("button")
const input = document.getElementById("wrd")
var isFocused = false

function getWordDefinition(word) {
	fetch(`/getDefinition?word=${word}`)
		.then(function(response) {
			return response.json()
			.then(function(data) {
				if (data['status'] != "error") {
					document.getElementById("wordname").innerHTML = data['word']
					document.getElementById("phon").innerHTML = data['phonetic']
					document.getElementById("audio").src = "https:" + data['phonetics'][0]['audio']
					document.getElementById("ori").innerHTML = data['origin']
					document.getElementById("noun").innerHTML = data['meanings'][0]['partOfSpeech']
					document.getElementById("def").innerHTML = data['meanings'][0]['definitions'][0]['definition']
					// This is how to use map in JavaScript lol, it's basically like table.foreach from lua lol.
					document.getElementById("syn").innerHTML = data['meanings'][0]['definitions'][0]['synonyms'].slice(0, 5).map((a, i) => 
						`<div>
							<h5>${i+1}. ${a}</h5>
						</div>`	
					).join('')
					// This is how to use map in JavaScript lol, it's basically like table.foreach from lua lol.
					document.getElementById("ant").innerHTML = data['meanings'][0]['definitions'][0]['antonyms'].slice(0, 5).map((a, i) => 
						`<div>
							<h5>${i+1}. ${a}</h5>
						</div>`	
					).join('')
				} else {
					document.getElementById("wordname").innerHTML = "None"
					document.getElementById("phon").innerHTML = "None"
					document.getElementById("audio").src = "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
					document.getElementById("ori").innerHTML = "None"
					document.getElementById("noun").innerHTML = "None"
					document.getElementById("def").innerHTML = "None"
					document.getElementById("syn").innerHTML = "None"
					document.getElementById("ant").innerHTML = "None"
				}
			})
		})
}

document.addEventListener("keypress", function(event) {
	if (event.key == 'Enter' && isFocused == true) {
    	getWordDefinition(input.value)
  	}
});

function changeFocus(bool) {
	isFocused = bool
}

button.onclick = function() {
	getWordDefinition(input.value)
}