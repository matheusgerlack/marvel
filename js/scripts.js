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
	  	containerstories = data.data.results;//get the array of results we want to work!

		//get title and description of the story	
		$.each(containerstories, function(i, containerstories){
		console.log(containerstories.title);//title
			$("#storytitle").append(containerstories.title);//>>to HTML STORY TITLE
		console.log(containerstories.description);//description
			$("#storydescription").append(containerstories.description);//>>to HTML STORY DESCRIPTION

		charactersobj = containerstories.characters;
		console.log(charactersobj);//chars obj
		});
			
		//>>nested API call (characters)
		
			var thumbs = [];
			var containercharacters = [];
			var imagevariant = 'portrait_uncanny';
			var thumbsext = [];

			 $.ajax({
    	  		
	  		  type: 'GET',
	  		  url: charactersobj.collectionURI,
	  		  data: { 'apikey' :'5005d198aef54a39e7f85e63d6cfe7e8' },
	  		  success: function(data) {
	  		  	containercharacters = data.data.results;
				console.log(containercharacters);//array of chars obj

				$.each(containercharacters, function(i, containercharacters){
				console.log(containercharacters.name);//NAME of chars
					$(".name").append('<h2>' + containercharacters.name + '</h2>');//>>to HTML CHAR NAME
				console.log(containercharacters.thumbnail);//Thumbnail Object
					thumbs.push(containercharacters.thumbnail); 
				});
				
					$.each(thumbs, function(i, thumbs){
					console.log(thumbs.path);//thumb url
					console.log(thumbs.extension);//thumb ext
						thumbsext.push(thumbs.path + '/' + imagevariant + '.' + thumbs.extension);
					console.log(thumbsext);	//>>to HTML CHAR THUMBNAIL
					//add function to append to img URL

					});					
	  		    
	  		  }//nested success closes
	  		  
	  	    });//nested ajax and main function closes
		
		//>>end of API call
	  
	  }//success closes
  
    }); //ajax and main function closes

//main function closes
});	

