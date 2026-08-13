/* ============================================
   Bible Reader
   Lets visitors pick any book, chapter, and
   public-domain translation, then fetches the
   text from bible-api.com.
   ============================================ */

(function () {
  // Every book of the Bible with its number of chapters.
  var BOOKS = [
    ["Genesis", 50], ["Exodus", 40], ["Leviticus", 27], ["Numbers", 36],
    ["Deuteronomy", 34], ["Joshua", 24], ["Judges", 21], ["Ruth", 4],
    ["1 Samuel", 31], ["2 Samuel", 24], ["1 Kings", 22], ["2 Kings", 25],
    ["1 Chronicles", 29], ["2 Chronicles", 36], ["Ezra", 10], ["Nehemiah", 13],
    ["Esther", 10], ["Job", 42], ["Psalms", 150], ["Proverbs", 31],
    ["Ecclesiastes", 12], ["Song of Solomon", 8], ["Isaiah", 66], ["Jeremiah", 52],
    ["Lamentations", 5], ["Ezekiel", 48], ["Daniel", 12], ["Hosea", 14],
    ["Joel", 3], ["Amos", 9], ["Obadiah", 1], ["Jonah", 4],
    ["Micah", 7], ["Nahum", 3], ["Habakkuk", 3], ["Zephaniah", 3],
    ["Haggai", 2], ["Zechariah", 14], ["Malachi", 4],
    ["Matthew", 28], ["Mark", 16], ["Luke", 24], ["John", 21],
    ["Acts", 28], ["Romans", 16], ["1 Corinthians", 16], ["2 Corinthians", 13],
    ["Galatians", 6], ["Ephesians", 6], ["Philippians", 4], ["Colossians", 4],
    ["1 Thessalonians", 5], ["2 Thessalonians", 3], ["1 Timothy", 6], ["2 Timothy", 4],
    ["Titus", 3], ["Philemon", 1], ["Hebrews", 13], ["James", 5],
    ["1 Peter", 5], ["2 Peter", 3], ["1 John", 5], ["2 John", 1],
    ["3 John", 1], ["Jude", 1], ["Revelation", 22]
  ];

  var TRANSLATION_NAMES = {
    web: "World English Bible",
    kjv: "King James Version",
    asv: "American Standard Version"
  };

  var bookSelect = document.getElementById("bookSelect");
  var chapterSelect = document.getElementById("chapterSelect");
  var translationSelect = document.getElementById("translationSelect");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var headingEl = document.getElementById("chapterHeading");
  var translationEl = document.getElementById("chapterTranslation");
  var textEl = document.getElementById("chapterText");

  // Fill the Book dropdown with all 66 books.
  BOOKS.forEach(function (book, index) {
    var option = document.createElement("option");
    option.value = index;
    option.textContent = book[0];
    bookSelect.appendChild(option);
  });

  // Fill the Chapter dropdown based on which book is chosen.
  function fillChapters(bookIndex, keepChapter) {
    var total = BOOKS[bookIndex][1];
    chapterSelect.innerHTML = "";
    for (var i = 1; i <= total; i++) {
      var option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      chapterSelect.appendChild(option);
    }
    chapterSelect.value = keepChapter && keepChapter <= total ? keepChapter : 1;
  }

  // Remember where the reader left off (stored in their own browser).
  function savePosition() {
    try {
      localStorage.setItem("cc-bible-position", JSON.stringify({
        book: bookSelect.value,
        chapter: chapterSelect.value,
        translation: translationSelect.value
      }));
    } catch (e) { /* private browsing may block this — that's fine */ }
  }

  function loadPosition() {
    try {
      return JSON.parse(localStorage.getItem("cc-bible-position"));
    } catch (e) {
      return null;
    }
  }

  function updateNavButtons() {
    var bookIndex = Number(bookSelect.value);
    var chapter = Number(chapterSelect.value);
    prevBtn.disabled = bookIndex === 0 && chapter === 1;
    nextBtn.disabled = bookIndex === BOOKS.length - 1 && chapter === BOOKS[bookIndex][1];
  }

  function loadChapter() {
    var bookIndex = Number(bookSelect.value);
    var bookName = BOOKS[bookIndex][0];
    var chapter = Number(chapterSelect.value);
    var translation = translationSelect.value;

    headingEl.textContent = bookName + " " + chapter;
    translationEl.textContent = TRANSLATION_NAMES[translation] + " (Public Domain)";
    textEl.innerHTML = '<p class="status">Loading…</p>';

    updateNavButtons();
    savePosition();

    var url = "https://bible-api.com/" + encodeURIComponent(bookName + " " + chapter) +
              "?translation=" + translation;

    fetch(url)
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed");
        return response.json();
      })
      .then(function (data) {
        var html = "<p>";
        data.verses.forEach(function (verse) {
          html += '<span class="verse-num">' + verse.verse + "</span>" +
                  verse.text.replace(/\s+/g, " ").trim() + " ";
        });
        html += "</p>";
        textEl.innerHTML = html;
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch(function () {
        textEl.innerHTML = '<p class="error">Sorry — we couldn’t load that chapter. ' +
          "Check your internet connection and try again.</p>";
      });
  }

  function step(direction) {
    var bookIndex = Number(bookSelect.value);
    var chapter = Number(chapterSelect.value) + direction;

    if (chapter < 1) {
      // Went back past chapter 1 — jump to the last chapter of the previous book.
      if (bookIndex === 0) return;
      bookIndex -= 1;
      bookSelect.value = bookIndex;
      fillChapters(bookIndex);
      chapter = BOOKS[bookIndex][1];
    } else if (chapter > BOOKS[bookIndex][1]) {
      // Went past the last chapter — jump to chapter 1 of the next book.
      if (bookIndex === BOOKS.length - 1) return;
      bookIndex += 1;
      bookSelect.value = bookIndex;
      fillChapters(bookIndex);
      chapter = 1;
    }

    chapterSelect.value = chapter;
    loadChapter();
  }

  bookSelect.addEventListener("change", function () {
    fillChapters(Number(bookSelect.value));
    loadChapter();
  });
  chapterSelect.addEventListener("change", loadChapter);
  translationSelect.addEventListener("change", loadChapter);
  prevBtn.addEventListener("click", function () { step(-1); });
  nextBtn.addEventListener("click", function () { step(1); });

  // Start where the reader left off, or at John 1 for first-time visitors.
  var saved = loadPosition();
  if (saved && BOOKS[Number(saved.book)]) {
    bookSelect.value = saved.book;
    fillChapters(Number(saved.book), Number(saved.chapter));
    if (TRANSLATION_NAMES[saved.translation]) translationSelect.value = saved.translation;
  } else {
    var johnIndex = 42; // John is the 43rd book
    bookSelect.value = johnIndex;
    fillChapters(johnIndex);
  }
  loadChapter();
})();
