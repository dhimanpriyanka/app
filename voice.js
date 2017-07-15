var result  
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var commands = [ 'play' , 'pause' , 'previous', 'forward'];
var grammar = '#JSGF V1.0; grammar commands; public <commands> = ' + commands.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;




$('.fa-microphone').on('click',function() {
	$('.fa-microphone').removeClass("active");
  recognition.start();
  console.log('Ready to receive a commands.');
})

recognition.onresult = function(event) {
	
	
  var speechResult = event.results.length - 1;
  result = event.results[speechResult][0].transcript;
  
  
    if(Result === "play"){
		$('.fa-microphone').addClass("active") ;
  var song = document.querySelector('audio');

		console.log('Playing');
		$('.play-icon').removeClass('fa-pause').addClass('fa-play');		
		song.play();
		
		}
		
	
  
}




