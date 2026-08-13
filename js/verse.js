/* ============================================
   Verse of the Day
   Picks a verse based on the day of the year and
   fetches its text from bible-api.com using the
   World English Bible (public domain).
   ============================================ */

(function () {
  // One reference per line — add or remove as many as you like!
  var VERSES = [
    "John 3:16",
    "Psalm 23:1-3",
    "Philippians 4:6-7",
    "Proverbs 3:5-6",
    "Isaiah 41:10",
    "Romans 8:28",
    "Jeremiah 29:11",
    "Joshua 1:9",
    "Psalm 46:1",
    "Matthew 11:28-30",
    "2 Corinthians 5:17",
    "Galatians 5:22-23",
    "Ephesians 2:8-9",
    "Psalm 119:105",
    "Romans 12:2",
    "1 Corinthians 13:4-7",
    "Hebrews 11:1",
    "James 1:5",
    "1 Peter 5:7",
    "Psalm 27:1",
    "Isaiah 40:31",
    "Matthew 6:33",
    "John 14:6",
    "Romans 5:8",
    "Colossians 3:23",
    "Psalm 37:4",
    "Micah 6:8",
    "Zephaniah 3:17",
    "John 16:33",
    "Romans 15:13",
    "2 Timothy 1:7",
    "Psalm 121:1-2",
    "Lamentations 3:22-23",
    "Matthew 5:16",
    "John 8:12",
    "Acts 1:8",
    "Romans 10:9",
    "1 John 1:9",
    "Revelation 21:4",
    "Psalm 34:8",
    "Proverbs 18:10",
    "Isaiah 53:5",
    "Matthew 28:19-20",
    "Mark 12:30-31",
    "Luke 6:31",
    "John 15:5",
    "Ephesians 4:32",
    "Philippians 4:13",
    "Colossians 3:2",
    "Hebrews 12:1-2",
    "James 4:8",
    "1 Thessalonians 5:16-18",
    "Psalm 139:14",
    "Galatians 2:20",
    "Deuteronomy 31:6",
    "Psalm 90:12",
    "Proverbs 16:3",
    "Isaiah 26:3",
    "Nahum 1:7",
    "Habakkuk 3:19"
  ];

  var textEl = document.getElementById("verseText");
  var refEl = document.getElementById("verseRef");
  var transEl = document.getElementById("verseTranslation");

  // Which day of the year is it? (1–366)
  var now = new Date();
  var startOfYear = new Date(now.getFullYear(), 0, 0);
  var dayOfYear = Math.floor((now - startOfYear) / 86400000);

  var reference = VERSES[dayOfYear % VERSES.length];

  fetch("https://bible-api.com/" + encodeURIComponent(reference) + "?translation=web")
    .then(function (response) {
      if (!response.ok) throw new Error("Request failed");
      return response.json();
    })
    .then(function (data) {
      textEl.textContent = "“" + data.text.replace(/\s+/g, " ").trim() + "”";
      refEl.textContent = data.reference;
      transEl.textContent = data.translation_name + " (Public Domain)";
    })
    .catch(function () {
      // If the internet or the API is down, show a built-in verse instead.
      textEl.textContent = "“For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.”";
      refEl.textContent = "John 3:16";
      transEl.textContent = "King James Version (Public Domain)";
    });
})();
