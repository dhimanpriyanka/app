		var currentSongNumber = 1;
		var willLoop = 0;
		var willShuffle = 0;
		
	
		
	function toggleSong() {							
		var song = document.querySelector('audio');
		if(song.paused == true) {
		console.log('Playing');
		$('.play-icon').removeClass('fa-play').addClass('fa-pause');		
		song.play();
		}
		else {
		console.log('Pausing');
		$('.play-icon').removeClass('fa-pause').addClass('fa-play');
		song.pause();
		}
		} 
						function changeCurrentSongDetails(songobj) {		
							$('.current-song-image').attr('src','img/' + songobj.image);
							$('.current-song-name').text(songobj.name);
							$('.current-song-album').text(songobj.album);
						}
						
						
						function UpdateTimer() {
						var song = document.querySelector('audio');
						var ct = song.currentTime;
						var td = song.duration;
						var percentage = (ct/td)*100;
						$('.progress-filled').css('width', percentage+ "%");
						}
						
						
		//--------------------------add fancy time format---------------------------
					function fancyTimeFormat(time)
			{   
				
				var hrs = ~~(time / 3600);
				var mins = ~~((time % 3600) / 60);
				var secs = time % 60;

				
				var ret = "";

				if (hrs > 0) {
					ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
				}

				ret += "" + mins + ":" + (secs < 10 ? "0" : "");
				ret += "" + secs;
				return ret;
			}
				
		//-------------------------------------end-----------------------------
		
	
				function updateCurrentTime() {
					var song = document.querySelector('audio');
					var currentTime = Math.floor(song.currentTime);
					currentTime = fancyTimeFormat(currentTime);
					var duration = Math.floor(song.duration);
					duration = fancyTimeFormat(duration);
					$('.time-elapsed').text(currentTime);
					$('.song-duration').text(duration);
				}					  
					  
				function timeJump() {
				var song = document.querySelector('audio')
				song.currentTime = song.duration - 5;
				}
	//------------when window is loading.....update the first song detail...			
			window.onload = function() {
						changeCurrentSongDetails(songs[0]);   
					updateCurrentTime(); 
					setInterval(function() {
					updateCurrentTime();
					UpdateTimer();
					},1000);
					
					$('#songs').DataTable({
						paging: false
					});
									
					}
						function addSongNameClickEvent(songobj,position) {
							var songName = songobj.fileName;
							var id = '#song' + position;
						$(id).click(function() {
						var audio = document.querySelector('audio');
						var currentSong = audio.src;
						if(currentSong.search(songName) != -1)
						{
						toggleSong();
						}
						else {
							
						audio.src = songName;
						toggleSong();
						console.log(obj);
						changeCurrentSongDetails(songobj);
						}
						});
						}
						
				 var songlist=[ 'Badrinath ki Dulhania','Ok Jaanu' ,'Befikre', 'Ae Dil Hai Mushkil'];
				 
						var songs = [{
							'name': 'Badri Ki Dulhania (Title Track)',
							'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
							'album': 'Badrinath ki Dulhania',
							'duration': '2:56',
						   'fileName': 'song1.mp3',
						   'image': 'song1.jpg'
						},
						{
							'name': 'Humma Song',
							'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
							'album': 'Ok Jaanu',
							'duration': '3:15',
							'fileName': 'song2.mp3',
						    'image': 'song2.jpg'
						},
						{
							'name': 'Nashe Si Chadh Gayi',
							'artist': 'Arijit Singh',
							'album': 'Befikre',
							'duration': '2:34',
							'fileName': 'song3.mp3',
						    'image': 'song3.jpg'
						},
						{
							'name': 'The Breakup Song',
							'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
							'album': 'Ae Dil Hai Mushkil',
							'duration': '2:29',
							'fileName': 'song4.mp3',
						    'image': 'song4.jpg'
						}]


								
					for(var i =0; i < songlist.length;i++) {
						var obj = songs[i];
							var name = '#song' + (i+1);
							var song = $(name);
							song.find('.song-name').text(obj.name);
							song.find('.song-artist').text(obj.artist);
							song.find('.song-album').text(obj.album);
							song.find('.song-length').text(obj.duration); 
							 addSongNameClickEvent(obj,i+1)
						}
						
							$('.fa-repeat').on('click',function() {
							$('.fa-repeat').toggleClass('disabled')
							willLoop = 1 - willLoop;
							});	
												
							$('.fa-random').on('click',function() {
							$('.fa-random').toggleClass('disabled');
							willShuffle = 1 - willShuffle;
							});	
							
							$('audio').on('ended',function() {
								var audio = document.querySelector('audio');
								if (willShuffle == 1) {
									var nextSongNumber = randomExcluded(1,4,currentSongNumber); 
									var nextSongobj = songs[nextSongNumber-1];
									audio.src = nextSongobj.fileName;
									toggleSong();
									changeCurrentSongDetails(nextSongobj);
									currentSongNumber = nextSongNumber;
								}
								else if(currentSongNumber < 4) {
									var nextSongobj = songs[currentSongNumber];
									audio.src = nextSongobj.fileName;
									toggleSong();
									changeCurrentSongDetails(nextSongobj);
									currentSongNumber = currentSongNumber + 1;
								}
								else if(willLoop == 1) {
									var nextSongobj = songs[0];
									audio.src = nextSongobj.fileName;
									toggleSong();
									changeCurrentSongDetails(nextSongobj);
									currentSongNumber =  1;
								}
								else {
									$('.play-icon').removeClass('fa-pause').addClass('fa-play');
									audio.currentTime = 0;
								}
							});
				//------------------------welcome screen ....then  click the button...open new page-----------------------			
							
		$('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 2) {
            var message = "Welcome to Songify, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
        }
    });
    $('.play-icon').on('click', function() {
        toggleSong();
    });
			$('body').on('keypress',function(event) {
			var target = event.target;
			if (event.keyCode == 32 && target.tagName !='INPUT')    
			{
				toggleSong();
			}
		});
			
			$('.main button').on('click', function() {
				$('.main').addClass('hidden');
            $('.welcome-screen').removeClass('hidden');
			
			});
			
			
	

		$('.fa-step-forward').on('click', function() {
			var audio = document.querySelector('audio');
		if(currentSongNumber < 4) {
        var nextSongobj = songs[currentSongNumber];
        audio.src = nextSongobj.fileName; 
        toggleSong(); 
        changeCurrentSongDetails(nextSongobj); 
        currentSongNumber = currentSongNumber + 1; 
		console.log('nextSong');
		}
		else {
			
		audio.currentTime = 0;
		console.log('nextSong');
    }
		});