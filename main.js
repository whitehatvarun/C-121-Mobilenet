function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet' , modelLoaded);
}

  function draw()
  {
    //Write The draw() function
    image(video , 0 , 0 , 300 , 300);
    classifier.classify(video , gotResults);
    }

       

  function modelLoaded()
  {
    console.log('Model Is Loaded !');
  }

  var previous_result = '';
  function gotResults(error , results)
  {
    //Write The gotResults() function
    if(error)
    {
      console.error(error)
    }

    else
    {
       if((results[0].confidence > 0.5) && (previous_result != results[0].label))
       {
         console.log(results);
         previous_result = results[0].label;

         var synth = window.speechSynthesis;
         speak_data = "Object detected is -" + results[0].label;
         var utterThis = new speechSynthesisUtterance(speak_data);
         synth.speak(utterThis);         
         
         document.getElementById("Object_name").innerHTML = results[0].label;
         document.getElementById("Object_accuracy").innerHTML = results[0].confidence.toFixed(3);
        }

        
    }
  }
