$(document).ready(function(){
    var organ = Synth.createInstrument("organ");

    var allNotes = ["C", "D", "E", "F", "G", "A", "B"];

    var allColors = ["#99CC00", "#0099FF", "#9933CC", "#CC0066", "#CC0033", "#FF3300", "#FF6600"];

    const MIN_OCTAVE = 3, MAX_OCTAVE = 5;

    for (var octave = MIN_OCTAVE; octave <= MAX_OCTAVE; octave++){
        var row = $("<div>").addClass("row");
        $("div#keyboard").append(row);

        for (var i = 0; i < allNotes.length; i++){
            //make a div with class="col"
            var col = $("<div>").addClass("col");
            //add it to the row
            row.append(col);
            //make a span with class="key"
            var keyboardKey = $("<span>").addClass("key");
            //add it to the column
            col.append(keyboardKey);
            //give it bg color from other array
            keyboardKey.css("background-color", allColors[i]);

            var note = allNotes[i];
            //add text with note & octave
            keyboardKey.text(note + octave); // "F4", "G3", "A5"
            //give it id with note and octave
            keyboardKey.attr("id", note + octave);
            //add data attributes to store note and octave
            keyboardKey.data("note", note);
            keyboardKey.data("octave", octave);

            keyboardKey.click(keyClicked);
        };
    };

    $("button#recordButton").click(toggleRecording);
    $("button#clearButton").click(clearRecording);
    $("button#playButton").click(
        function() {
            playRecording(recordedNotes);
        }
    );

    var isRecording = false;

    var recordedNotes = [];

    function clearRecording(){
        recordedNotes = [];
    };

    function toggleRecording(){
        //toggle a global flag for recording or not
        isRecording = !isRecording;

        //toggle the class on the button from btn-light to btn-dark (and back)
        $("#recordButton").toggleClass("btn-light btn-dark").text(isRecording ? "Stop Recording" : "Start Recording");

        //toggle the text on the button to say "Start Recording" or "Stop Recording"
    };

    function keyClicked(){
        //what span was clicked?
        var keyPlayed = $(this);
        var notePlayed = keyPlayed.data("note");
        var octavePlayed = keyPlayed.data("octave");

        playNote(notePlayed, octavePlayed);

        if (isRecording) {
            recordedNotes.push(notePlayed + "," + octavePlayed);
        }
    };

    function playRecording(arrayOfNotes){
        arrayOfNotes.forEach(function(note, index) {
            setTimeout(
            function() {
                playRecordedNote(note);
            }, 500 * index
            )
        });
    }

    function playRecordedNote(){
        var pieces = recordedNotes.split(","); //"C","4"
        var note = pieces[0];// "C"
        var octave = pieces[1];// "4"
    }

    function playNote(note, octave) {
        organ.play(note, octave, 0.5);
    };
});