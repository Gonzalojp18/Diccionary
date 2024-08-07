
const arry =
  [
    {
      "word": "learn",
      "phonetic": "/lɜːn/",
      "phonetics": [
        {
          "text": "/lɜːn/",
          "audio": ""
        },
        {
          "text": "/lɝn/",
          "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/learn-us.mp3",
          "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=876680",
          "license": {
            "name": "BY-SA 3.0",
            "url": "https://creativecommons.org/licenses/by-sa/3.0"
          }
        }
      ],
      "meanings": [
        {
          "partOfSpeech": "noun",
          "definitions": [
            {
              "definition": "The act of learning something",
              "synonyms": [],
              "antonyms": []
            }
          ],
          "synonyms": [],
          "antonyms": []
        },
        {
          "partOfSpeech": "verb",
          "definitions": [
            {
              "definition": "To acquire, or attempt to acquire knowledge or an ability to do something.",
              "synonyms": [],
              "antonyms": []
            },
            {
              "definition": "To attend a course or other educational activity.",
              "synonyms": [],
              "antonyms": []
            },
            {
              "definition": "To gain knowledge from a bad experience so as to improve.",
              "synonyms": [],
              "antonyms": [],
              "example": "learn from one's mistakes"
            },
            {
              "definition": "To study.",
              "synonyms": [],
              "antonyms": [],
              "example": "I learn medicine."
            },
            {
              "definition": "To come to know; to become informed of; to find out.",
              "synonyms": [],
              "antonyms": [],
              "example": "He just learned that he will be sacked."
            }
          ],
          "synonyms": [
            "study"
          ],
          "antonyms": [
            "forget",
            "teach"
          ]
        }
      ],
    },
    {
      "word": "learn",
      "phonetic": "/lɜːn/",
      "phonetics": [
        {
          "text": "/lɜːn/",
          "audio": ""
        },
        {
          "text": "/lɝn/",
          "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/learn-us.mp3",
          "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=876680",
          "license": {
            "name": "BY-SA 3.0",
            "url": "https://creativecommons.org/licenses/by-sa/3.0"
          }
        }
      ],
      "meanings": [
        {
          "partOfSpeech": "verb",
          "definitions": [
            {
              "definition": "To teach.",
              "synonyms": [],
              "antonyms": [],
              "example": "Give him a clip round the ear. That'll learn him!"
            }
          ],
          "synonyms": [],
          "antonyms": []
        }
      ]
    }
  ]


const test = arry.forEach(e => {
    e.phonetics.forEach(ele => {
        console.log(ele)
    })
})