$(function() {
  // simple MVC pattern example.

  // model
  var model = {
    init: function() {
      if (!localStorage.notes) {
        localStorage.notes = JSON.stringify([]);
      }
    },
    add: function(obj) {
      var data = JSON.parse(localStorage.notes);
      data.push(obj);
      localStorage.notes = JSON.stringify(data);
    },
    getAllNotes: function() {
      return JSON.parse(localStorage.notes);
    },

    formatDate: function(timestamp) {
      var date = new Date(timestamp);
      return date.toTimeString();
    },

    clear: function() {
      localStorage.clear();
      location.reload();
    }
  };

  // controller
  var octopus = {
    addNewNote: function(noteStr) {
      model.add({
        content: noteStr,
        date: model.formatDate(Date.now())
      });
      view.render();
    },

    getNotes: function() {
      return model.getAllNotes().reverse();
    },

    init: function() {
      model.init();
      view.init();
    },

    clear: function() {
      model.clear();
    }
  };

  // view
  var view = {
    init: function() {
      this.noteList = $("#notes");
      var newNoteForm = $("#new-note-form");
      var newNoteContent = $("#new-note-content");
      this.clear = $("#clear");
      newNoteForm.submit(function(e) {
        octopus.addNewNote(newNoteContent.val());
        newNoteContent.val("");
        e.preventDefault();
      });
      this.clear.on("click", function(e) {
        octopus.clear();
      });
      view.render();
    },
    render: function() {
      var htmlStr = "";
      octopus.getNotes().forEach(function(note) {
        console.log(note);
        htmlStr += '<span class="note-date">' + note.date + "</span>";
        htmlStr += '<li class="note">' + note.content + "</li>";
      });
      this.noteList.html(htmlStr);
    }
  };

  octopus.init();
});
