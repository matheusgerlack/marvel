$(function(){
	var containerstories = [];
	var charactersobj = [];
	var containercharacters = [];
	var storyid = '838';
	
	//API call (story)
	$.ajax({
	  type: 'GET',
	  url: 'http://gateway.marvel.com:80/v1/public/stories/' + storyid,
	  data: { 'apikey' :'5005d198aef54a39e7f85e63d6cfe7e8' },
	  success: function(data) {
	  	containerstories = data.data.results;//build the array of results we want to work with!

		//get title and description of the story	
		$.each(containerstories, function(i, containerstories){
			if(containerstories.description === ""){ //if desc unavaiable will prepend a message.
				$(".story").prepend('<p> Description unavaiable at database.</p>');
			}else{
				$(".story").prepend('<p>' + containerstories.description + '</p>');	
			}
		$(".story").prepend('<h1>' + containerstories.title + '</h1>');//append HTML STORY TITLE
		charactersobj = containerstories.characters;
		});
			
		//>>nested API call (characters)
		
			var thumbs = [];
			var containercharacters = [];
			var imagevariant = 'portrait_uncanny';
			var thumbsext = [];
			var names = [];

			 $.ajax({
	  		  type: 'GET',
	  		  url: charactersobj.collectionURI,
	  		  data: { 'apikey' :'5005d198aef54a39e7f85e63d6cfe7e8' },
	  		  success: function(data) {
	  		  	containercharacters = data.data.results; //build the array of characters in this story

				$.each(containercharacters, function(i, containercharacters){//build names and thumbnail(objects) arrays
					names.push(containercharacters.name);
					thumbs.push(containercharacters.thumbnail); 
				});
					$('.row').prepend('<h3>Featuring:</h3>');
					
					$.each(thumbs, function(i, thumbs){  //iterate over thumbnails array
					thumbsext.push(thumbs.path + '/' + imagevariant + '.' + thumbs.extension); //build thumb's URL extension
					var namestoappend = '<h3>' + names[i] + '</h3>' ; 
					var thumbstoappend = '<img src =' + ' " ' + thumbsext[i] + ' " ' + 'class="img-responsive"/>' ;
					$(".row").append('<div class="col-md-6 col-xm-12">' + namestoappend + thumbstoappend + '</div>');//append grid, names and thumbs
					});	
					
	  			$('footer').append(data.attributionHTML);//marvel attr text
	  		  }//nested success closes
	  		  
	  	    });//nested ajax and main function closes
		
		//>>end of API call
	  
	  }//success closes
  
    }); //ajax and main function closes
	
//main function closes
});	

