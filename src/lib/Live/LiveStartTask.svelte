<script>
	export let activeTask
	export let socket
	export let startingTask
	export let startingLiveTask
	export let game

	let invalid = false

	let isDev = new URLSearchParams(window.location.search).has('dev')

	if (!activeTask) {
		activeTask = {
			hiragana: [],
			katakana: [],
			odkanji: [],
			oskanji: [],
			title: '',
			type: 0, // 0 QUIZ 1 LEARN 2 SPEED 3 TEST
			answerIn: 0, // 0 ROMANJI 1 JAPENESE
			kanji: false, // FALSE kana TRUE kanji (CANT BE BOTH)
			plain: false, // FALSE not plain form or OBJ for plain form
		}
	}
	if (activeTask.incorrect) activeTask.incorrect = null
	let inTask = false

	let plainFormSchemaFilled = {
		answerIn: {
			conjugations: [
				'a', 'i', 'u', 'e', 'ou',
			],
			formal: [
				'present', 'past', 'negPresent', 'negPast', 'pleaseCommand', 'want', 'lets',
			],
			informal: [
				'present', 'past', 'negPresent', 'negPast', 'command', 'want', 'lets',
			],
		},
		groups: [
			'godan', 'ichidan', 'irregular'
		],
		questions: 20,
	}

	let plainFormSchema = {
		answerIn: {
			conjugations: [],
			formal: [],
			informal: [],
		},
		groups: [],
		questions: 20,
	}

	function checkJP() {
		if (activeTask.answerIn == 1) {
			// clean array from combo kana, doesn't work with answer in jp
			activeTask.hiragana = activeTask.hiragana.filter((item) => !Object.keys(comboHiragana).includes(item))
			activeTask.katakana = activeTask.katakana.filter((item) => !Object.keys(comboKatakana).includes(item))
		}
	}

	let groups = {
        "godan": [
        [
            "いあ",
            "いい",
            "いう",
            "いえ",
            "いおう",
            "いって",
            "いった"
        ],
        [
            "あら",
            "あり",
            "ある",
            "あれ",
            "あろう",
            "あって",
            "あった"
        ],
        [
            "うたあ",
            "うたい",
            "うたう",
            "うたえ",
            "うたおう",
            "うたって",
            "うたった"
        ],
        [
            "おわら",
            "おわり",
            "おわる",
            "おわれ",
            "おわろう",
            "おわって",
            "おわった"
        ],
        [
            "かえら",
            "かえり",
            "かえる",
            "かえれ",
            "かえろう",
            "かえって",
            "かえった"
        ],
        [
            "すま",
            "すみ",
            "すむ",
            "すめ",
            "すもう",
            "すんで",
            "すんだ"
        ],
        [
            "たた",
            "たち",
            "たつ",
            "たて",
            "たとう",
            "たって",
            "たった"
        ],
        [
            "のら",
            "のり",
            "のる",
            "のれ",
            "のろう",
            "のって",
            "のった"
        ],
        [
            "はなさ",
            "はなし",
            "はなす",
            "はなせ",
            "はなそう",
            "はなして",
            "はなした"
        ],
        [
            "また",
            "まち",
            "まつ",
            "まて",
            "まとう",
            "まって",
            "まった"
        ],
        [
            "わから",
            "わかり",
            "わかる",
            "わかれ",
            "わかろう",
            "わかって",
            "わかった"
        ],
        [
            "きか",
            "きき",
            "きく",
            "きけ",
            "きこう",
            "きいて",
            "きいた"
        ],
        [
            "かか",
            "かき",
            "かく",
            "かけ",
            "かこう",
            "かいて",
            "かいた"
        ],
        [
            "よま",
            "よみ",
            "よむ",
            "よめ",
            "よもう",
            "よんで",
            "よんだ"
        ],
        [
            "とら",
            "とり",
            "とる",
            "とれ",
            "とろう",
            "とって",
            "とった"
        ],
        [
            "つくら",
            "つくり",
            "つくる",
            "つくれ",
            "つくろう",
            "つくって",
            "つくった"
        ],
        [
            "ああ",
            "あい",
            "あう",
            "あえ",
            "あおう",
            "あって",
            "あった"
        ],
        [
            "はか",
            "はき",
            "はく",
            "はけ",
            "はこう",
            "はいて",
            "はいた"
        ],
        [
            "いか",
            "いき",
            "いく",
            "いけ",
            "いこう",
            "いいて",
            "いいた"
        ],
        [
            "まがら",
            "まがり",
            "まがる",
            "まがれ",
            "まがろう",
            "まがって",
            "まがった"
        ],
        [
            "かから",
            "かかり",
            "かかる",
            "かかれ",
            "かかろう",
            "かかって",
            "かかった"
        ],
        [
            "わたら",
            "わたり",
            "わたる",
            "わたれ",
            "わたろう",
            "わたって",
            "わたった"
        ],
        [
            "あがら",
            "あがり",
            "あがる",
            "あがれ",
            "あがろう",
            "あがって",
            "あがった"
        ],
        [
            "おら",
            "おり",
            "おる",
            "おれ",
            "おろう",
            "おって",
            "おった"
        ],
        [
            "はいら",
            "はいり",
            "はいる",
            "はいれ",
            "はいろう",
            "はいって",
            "はいった"
        ],
        [
            "つかあ",
            "つかい",
            "つかう",
            "つかえ",
            "つかおう",
            "つかって",
            "つかった"
        ],
        [
            "さわら",
            "さわり",
            "さわる",
            "さわれ",
            "さわろう",
            "さわって",
            "さわった"
        ],
        [
            "しゃべら",
            "しゃべり",
            "しゃべる",
            "しゃべれ",
            "しゃべろう",
            "しゃべって",
            "しゃべった"
        ],
        [
            "ぬが",
            "ぬぎ",
            "ぬぐ",
            "ぬげ",
            "ぬごう",
            "ぬいで",
            "ぬいだ"
        ],
        [
            "かま",
            "かみ",
            "かむ",
            "かめ",
            "かもう",
            "かんで",
            "かんだ"
        ],
        [
            "あらあ",
            "あらい",
            "あらう",
            "あらえ",
            "あらおう",
            "あらって",
            "あらった"
        ],
        [
            "はたらか",
            "はたらき",
            "はたらく",
            "はたらけ",
            "はたらこう",
            "はたらいて",
            "はたらいた"
        ],
        [
            "もらあ",
            "もらい",
            "もらう",
            "もらえ",
            "もらおう",
            "もらって",
            "もらった"
        ],
        [
            "およが",
            "およぎ",
            "およぐ",
            "およげ",
            "およごう",
            "およいで",
            "およいだ"
        ],
        [
            "はしら",
            "はしり",
            "はしる",
            "はしれ",
            "はしろう",
            "はしって",
            "はしった"
        ],
        [
            "かた",
            "かち",
            "かつ",
            "かて",
            "かとう",
            "かって",
            "かった"
        ],
        [
            "けら",
            "けり",
            "ける",
            "けれ",
            "けろう",
            "けって",
            "けった"
        ]
        ],
        "ichidan": [
        [
            "あび",
            "あび",
            "あびる",
            "あびれ",
            "あびよう",
            "あびて",
            "あびた"
        ],
        [
            "あけ",
            "あけ",
            "あける",
            "あけれ",
            "あけよう",
            "あけて",
            "あけた"
        ],
        [
            "い",
            "い",
            "いる",
            "いれ",
            "いよう",
            "いて",
            "いた"
        ],
        [
            "みせ",
            "みせ",
            "みせる",
            "みせれ",
            "みせよう",
            "みせて",
            "みせた"
        ],
        [
            "み",
            "み",
            "みる",
            "みれ",
            "みよう",
            "みて",
            "みた"
        ],
        [
            "ね",
            "ね",
            "ねる",
            "ねれ",
            "ねよう",
            "ねて",
            "ねた"
        ],
        [
            "つかれ",
            "つかれ",
            "つかれる",
            "つかれれ",
            "つかれよう",
            "つかれて",
            "つかれた"
        ],
        [
            "おき",
            "おき",
            "おきる",
            "おきれ",
            "おきよう",
            "おきて",
            "おきた"
        ],
        [
            "かえ",
            "かえ",
            "かえる",
            "かえれ",
            "かえよう",
            "かえて",
            "かえた"
        ],
        [
            "いれ",
            "いれ",
            "いれる",
            "いれれ",
            "いれよう",
            "いれて",
            "いれた"
        ],
        [
            "しめ",
            "しめ",
            "しめる",
            "しめれ",
            "しめよう",
            "しめて",
            "しめた"
        ],
        [
            "おしえ",
            "おしえ",
            "おしえる",
            "おしえれ",
            "おしえよう",
            "おしえて",
            "おしえた"
        ],
        [
            "おぼえ",
            "おぼえ",
            "おぼえる",
            "おぼえれ",
            "おぼえよう",
            "おぼえて",
            "おぼえた"
        ],
        [
            "なげ",
            "なげ",
            "なげる",
            "なげれ",
            "なげよう",
            "なげて",
            "なげた"
        ],
        [
            "まけ",
            "まけ",
            "まける",
            "まけれ",
            "まけよう",
            "まけて",
            "まけた"
        ],
        [
            "やめ",
            "やめ",
            "やめる",
            "やめれ",
            "やめよう",
            "やめて",
            "やめた"
        ],
        [
            "うけ",
            "うけ",
            "うける",
            "うけれ",
            "うけよう",
            "うけて",
            "うけた"
        ],
        [
            "つづけ",
            "つづけ",
            "つづける",
            "つづけれ",
            "つづけよう",
            "つづけて",
            "つづけた"
        ]
        ],
        "irregular": [
        [
            "こ",
            "き",
            "くる",
            "くれ",
            "こよう",
            "きて",
            "きた"
        ],
        [
            "し",
            "し",
            "する",
            "すれ",
            "しよう",
            "して",
            "した"
        ]
        ]
    }

	function fillQuestions(plain) {
        let questions = []

        let applicableVerbs = []
        plain.groups.forEach((i) => {
            applicableVerbs = applicableVerbs.concat(groups[i])
        })

        let conjugations = []
        plain.answerIn.conjugations.forEach((i) => {
            conjugations.push(i)
        })
        plain.answerIn.formal.forEach((i) => {
            conjugations.push('f' + i)
        })
        plain.answerIn.informal.forEach((i) => {
            conjugations.push('i' + i)
        })

        let lastIndex = 0

        for (let i = 0; i < plainFormSchemaFilled.questions; i++) {
            if (applicableVerbs.length < 1) {
                plain.groups.forEach((i) => {
                    applicableVerbs = applicableVerbs.concat(groups[i])
                })
            }
            let verb = applicableVerbs[Math.floor(Math.random() * applicableVerbs.length)]
            // Remove verb
            applicableVerbs = applicableVerbs.filter((i) => {
                return i[0] != verb[0]
            })
            let conj = conjugations[lastIndex]
            let curObj = {
                answer: '', // e.g. hashirimasu
                verbFrom: '', // e.g. hashiru
                type: '', // e.g. formal (|informal|conjugation)
                tense: '', // e.g. present (|past|future)
                nudge: 'Press \'Enter\' to submit', // text for above box
                color: 0, // 0 pink, 1 green, 2 red
                input: '', // user input
                conj,
                correct: true,
            }
            if (conj == 'a') {
                curObj["answer"] = verb[0]
                curObj["verbFrom"] = verb[1] + 'ます'
                curObj["type"] = "conjugation"
                curObj["tense"] = "～あ"
            } else if (conj == 'i') {
                curObj["answer"] = verb[1]
                curObj["verbFrom"] = verb[2]
                curObj["type"] = "conjugation"
                curObj["tense"] = "～い"
            } else if (conj == 'u') {
                curObj["answer"] = verb[2]
                curObj["verbFrom"] = verb[1] + 'ます'
                curObj["type"] = "conjugation"
                curObj["tense"] = "～う"
            } else if (conj == 'e') {
                curObj["answer"] = verb[3]
                curObj["verbFrom"] = verb[1] + 'ます'
                curObj["type"] = "conjugation"
                curObj["tense"] = "～え"
            } else if (conj == 'ou') {
                curObj["answer"] = verb[4]
                curObj["verbFrom"] = verb[1] + 'ます'
                curObj["type"] = "conjugation"
                curObj["tense"] = "～おう"
            } else if (conj == 'fpresent') {
                curObj["answer"] = verb[1] + 'ます'
                curObj["verbFrom"] = verb[2]
                curObj["type"] = "formal"
                curObj["tense"] = "present"
            } else if (conj == 'ipresent') {
                curObj["answer"] = verb[2]
                curObj["verbFrom"] = verb[1] + 'ます'
                curObj["type"] = "informal"
                curObj["tense"] = "present"
            } else if (conj == 'fpast') {
                curObj["answer"] = verb[1] + 'ました'
                curObj["verbFrom"] = verb[2]
                curObj["type"] = "formal"
                curObj["tense"] = "past"
            } else if (conj == 'ipast') {
                curObj["answer"] = verb[6]
                curObj["verbFrom"] = verb[1] + 'ます'
                curObj["type"] = "informal"
                curObj["tense"] = "past"
            } else if (conj == 'fnegPresent') {
                curObj["answer"] = verb[1] + 'ません'
                curObj["verbFrom"] = verb[2]
                curObj["type"] = "formal"
                curObj["tense"] = "negative present"
            } else if (conj == 'inegPresent') {
                curObj["answer"] = verb[0] + 'ない'
                curObj["verbFrom"] = verb[1] + 'ます'
                curObj["type"] = "informal"
                curObj["tense"] = "negative present"
            } else if (conj == 'fnegPast') {
                curObj["answer"] = verb[1] + 'ませんでした'
                curObj["verbFrom"] = verb[2]
                curObj["type"] = "formal"
                curObj["tense"] = "negative past"
            } else if (conj == 'inegPast') {
                curObj["answer"] = verb[0] + 'なかった'
                curObj["verbFrom"] = verb[1] + 'ます'
                curObj["type"] = "informal"
                curObj["tense"] = "negative past"
            } else if (conj == 'fpleaseCommand') {
                curObj["answer"] = verb[5] + 'ください'
                curObj["verbFrom"] = verb[2]
                curObj["type"] = "formal"
                curObj["tense"] = "please command"
            } else if (conj == 'icommand') {
                curObj["answer"] = verb[5]
                curObj["verbFrom"] = verb[1] + 'ます'
                curObj["type"] = "informal"
                curObj["tense"] = "command"
            } else if (conj == 'fwant') {
                curObj["answer"] = verb[1] + 'たいです'
                curObj["verbFrom"] = verb[2]
                curObj["type"] = "formal"
                curObj["tense"] = "want"
            } else if (conj == 'iwant') {
                curObj["answer"] = verb[1] + 'たい'
                curObj["verbFrom"] = verb[1] + 'ます'
                curObj["type"] = "informal"
                curObj["tense"] = "want"
            } else if (conj == 'flets') {
                curObj["answer"] = verb[1] + 'ましょう'
                curObj["verbFrom"] = verb[2]
                curObj["type"] = "formal"
                curObj["tense"] = "let's"
            } else if (conj == 'ilets') {
                curObj["answer"] = verb[4]
                curObj["verbFrom"] = verb[1] + 'ます'
                curObj["type"] = "informal"
                curObj["tense"] = "let's"
            }

            questions.push(curObj)

            lastIndex++
            if (lastIndex >= conjugations.length) {
                lastIndex = 0
            }
        }
        return questions
    }

	function startTask() {
		if (activeTask.plain) {
			let {plain} = activeTask // for easy access
			// Need at least one from verb group and at least one answerIn
			// Concat for if
			let answersIn_ = plain.answerIn.conjugations.concat(plain.answerIn.formal, plain.answerIn.informal)
			if (answersIn_.length == 0 || plain.groups.length == 0 || plain.questions < 1) {
				invalid = true
			} else {

				activeTask.questionsArr = fillQuestions(plain)

				game.task = activeTask
				socket.emit('hostStartGame', activeTask, game)
				startingTask = true
				startingLiveTask = false
			}			
		} else if (activeTask.kanji) {
			activeTask.hiragana = []
			activeTask.katakana = []
			activeTask.ounits = []
			if (activeTask.odkanji.length > 0 || activeTask.oskanji.length > 0) {
				let kod = []
				let kos = []
				let ounits = []
				let odunitslist = Object.keys(kanjiod)
				let osunitslist = Object.keys(kanjios)
				activeTask.odkanji.forEach((item) => {
					kod.push(...item)
					odunitslist.find((unit) => {
						console.log(unit, item)
						if (kanjiod[unit][0][0] == item[0][0]) {
							ounits.push('d'+unit)
						}
					})
				})
				activeTask.oskanji.forEach((item) => {
					kos.push(...item)
					osunitslist.find((unit) => {
						if (kanjios[unit][0][0] == item[0][0]) {
							ounits.push('s'+unit)
						}
					})
				})
				// figure out units


				activeTask.odkanji = kod
				activeTask.oskanji = kos
				activeTask.ounits = ounits
				game.task = activeTask
				socket.emit('hostStartGame', activeTask, game)
				startingTask = true
				startingLiveTask = false
			} else {
				invalid = true
			}
		} else {
			if (activeTask.answerIn == 1) {
				// clean array from combo kana, doesn't work with answer in jp
				activeTask.hiragana = activeTask.hiragana.filter((item) => !Object.keys(comboHiragana).includes(item))
				activeTask.katakana = activeTask.katakana.filter((item) => !Object.keys(comboKatakana).includes(item))
			}
			if (activeTask.hiragana.length > 0 || activeTask.katakana.length > 0) {
				game.task = activeTask
				socket.emit('hostStartGame', activeTask, game)
				startingTask = true
				startingLiveTask = false
			} else {
				invalid = true
			}
		}
	}

	let belts = ['white', 'yellow', 'orange', 'green', 'blue', 'purple', 'red', 'brown', 'black']
	let beltsContain = {
		white: ['a'],
		yellow: ['ka', 'sa', 'ta'],
		orange: ['na', 'ha', 'ma'],
		green: ['ya', 'ra', 'wa'],
		blue: ['ga', 'za', 'da'],
		purple: ['ba', 'pa', 'kya'],
		red: ['sha', 'cha', 'nya'],
		brown: ['hya', 'mya', 'rya'],
		black: ['gya', 'ja', 'bya', 'pya'],
	}
	let mainKatakana = {
		a: [
			['ア', 'a'],
			['イ', 'i'],
			['ウ', 'u'],
			['エ', 'e'],
			['オ', 'o'],
		],
		ka: [
			['カ', 'ka'],
			['キ', 'ki'],
			['ク', 'ku'],
			['ケ', 'ke'],
			['コ', 'ko'],
		],
		sa: [
			['サ', 'sa'],
			['シ', 'shi'],
			['ス', 'su'],
			['セ', 'se'],
			['ソ', 'so'],
		],
		ta: [
			['タ', 'ta'],
			['チ', 'chi'],
			['ツ', 'tsu'],
			['テ', 'te'],
			['ト', 'to'],
		],
		na: [
			['ナ', 'na'],
			['ニ', 'ni'],
			['ヌ', 'nu'],
			['ネ', 'ne'],
			['ノ', 'no'],
		],
		ha: [
			['ハ', 'ha'],
			['ヒ', 'hi'],
			['フ', 'fu|hu'],
			['ヘ', 'he'],
			['ホ', 'ho'],
		],
		ma: [
			['マ', 'ma'],
			['ミ', 'mi'],
			['ム', 'mu'],
			['メ', 'me'],
			['モ', 'mo'],
		],
		ya: [
			['ヤ', 'ya'],
			['ユ', 'yu'],
			['ヨ', 'yo'],
		],
		ra: [
			['ラ', 'ra'],
			['リ', 'ri'],
			['ル', 'ru'],
			['レ', 're'],
			['ロ', 'ro'],
		],
		wa: [
			['ワ', 'wa'],
			['ヲ', 'wo'],
			['ン', 'n'],
		],
	}
	let dakutenKatakana = {
		ga: [
			['ガ', 'ga'],
			['ギ', 'gi'],
			['グ', 'gu'],
			['ゲ', 'ge'],
			['ゴ', 'go'],
		],
		za: [
			['ザ', 'za'],
			['ジ', 'ji|zi'], // Unsure (but ji)
			['ズ', 'zu'],
			['ゼ', 'ze'],
			['ゾ', 'zo'],
		],
		da: [
			['ダ', 'da'],
			['ヂ', 'di'],
			['ヅ', 'dzu|du'],
			['デ', 'de'],
			['ド', 'do'],
		],
		ba: [
			['バ', 'ba'],
			['ビ', 'bi'],
			['ブ', 'bu'],
			['ベ', 'be'],
			['ボ', 'bo'],
		],
		pa: [
			['パ', 'pa'],
			['ピ', 'pi'],
			['プ', 'pu'],
			['ペ', 'pe'],
			['ポ', 'po'],
		],
	}
	let comboKatakana = {
		kya: [
			['キャ', 'kya'],
			['キュ', 'kyu'],
			['キョ', 'kyo'],
		],
		sha: [
			['シャ', 'sha'],
			['シュ', 'shu'],
			['ショ', 'sho'],
		],
		cha: [
			['チャ', 'cha'],
			['チュ', 'chu'],
			['チョ', 'cho'],
		],
		nya: [
			['ニャ', 'nya'],
			['ニュ', 'nyu'],
			['ニョ', 'nyo'],
		],
		hya: [
			['ヒャ', 'hya'],
			['ヒュ', 'hyu'],
			['ヒョ', 'hyo'],
		],
		mya: [
			['ミャ', 'mya'],
			['ミュ', 'myu'],
			['ミョ', 'myo'],
		],
		rya: [
			['リャ', 'rya'],
			['リュ', 'ryu'],
			['リョ', 'ryo'],
		],
		gya: [
			['ギャ', 'gya'],
			['ギュ', 'gyu'],
			['ギョ', 'gyo'],
		],
		ja: [
			['ジャ', 'ja|jya'],
			['ジュ', 'ju|jyu'],
			['ジョ', 'jo|jyo'],
		],
		bya: [
			['ビャ', 'bya'],
			['ビュ', 'byu'],
			['ビョ', 'byo'],
		],
		pya: [
			['ピャ', 'pya'],
			['ピュ', 'pyu'],
			['ピョ', 'pyo'],
		],
		dya: [
			['ヂャ', 'dya'],
			['ヂュ', 'dyu'],
			['ヂョ', 'dyo'],
		],
	}
	let mainHiragana = {
		a: [
			['あ', 'a'],
			['い', 'i'],
			['う', 'u'],
			['え', 'e'],
			['お', 'o'],
		],
		ka: [
			['か', 'ka'],
			['き', 'ki'],
			['く', 'ku'],
			['け', 'ke'],
			['こ', 'ko'],
		],
		sa: [
			['さ', 'sa'],
			['し', 'shi'],
			['す', 'su'],
			['せ', 'se'],
			['そ', 'so'],
		],
		ta: [
			['た', 'ta'],
			['ち', 'chi'],
			['つ', 'tsu'],
			['て', 'te'],
			['と', 'to'],
		],
		na: [
			['な', 'na'],
			['に', 'ni'],
			['ぬ', 'nu'],
			['ね', 'ne'],
			['の', 'no'],
		],
		ha: [
			['は', 'ha'],
			['ひ', 'hi'],
			['ふ', 'fu|hu'],
			['へ', 'he'],
			['ほ', 'ho'],
		],
		ma: [
			['ま', 'ma'],
			['み', 'mi'],
			['む', 'mu'],
			['め', 'me'],
			['も', 'mo'],
		],
		ya: [
			['や', 'ya'],
			['ゆ', 'yu'],
			['よ', 'yo'],
		],
		ra: [
			['ら', 'ra'],
			['り', 'ri'],
			['る', 'ru'],
			['れ', 're'],
			['ろ', 'ro'],
		],
		wa: [
			['わ', 'wa'],
			['を', 'wo'],
			['ん', 'n'],
		],
	}
	let dakutenHiragana = {
		ga: [
			['が', 'ga'],
			['ぎ', 'gi'],
			['ぐ', 'gu'],
			['げ', 'ge'],
			['ご', 'go'],
		],
		za: [
			['ざ', 'za'],
			['じ', 'ji|zi'], //
			['ず', 'zu'],
			['ぜ', 'ze'],
			['ぞ', 'zo'],
		],
		da: [
			['だ', 'da'],
			['ぢ', 'di'],
			['づ', 'dzu|du'],
			['で', 'de'],
			['ど', 'do'],
		],
		ba: [
			['ば', 'ba'],
			['び', 'bi'],
			['ぶ', 'bu'],
			['べ', 'be'],
			['ぼ', 'bo'],
		],
		pa: [
			['ぱ', 'pa'],
			['ぴ', 'pi'],
			['ぷ', 'pu'],
			['ぺ', 'pe'],
			['ぽ', 'po'],
		],
	}
	let comboHiragana = {
		kya: [
			['きゃ', 'kya'],
			['きゅ', 'kyu'],
			['きょ', 'kyo'],
		],
		sha: [
			['しゃ', 'sha'],
			['しゅ', 'shu'],
			['しょ', 'sho'],
		],
		cha: [
			['ちゃ', 'cha'],
			['ちゅ', 'chu'],
			['ちょ', 'cho'],
		],
		nya: [
			['にゃ', 'nya'],
			['にゅ', 'nyu'],
			['にょ', 'nyo'],
		],
		hya: [
			['ひゃ', 'hya'],
			['ひゅ', 'hyu'],
			['ひょ', 'hyo'],
		],
		mya: [
			['みゃ', 'mya'],
			['みゅ', 'myu'],
			['みょ', 'myo'],
		],
		rya: [
			['りゃ', 'rya'],
			['りゅ', 'ryu'],
			['りょ', 'ryo'],
		],
		gya: [
			['ぎゃ', 'gya'],
			['ぎゅ', 'gyu'],
			['ぎょ', 'gyo'],
		],
		ja: [
			['じゃ', 'ja|jya'],
			['じゅ', 'ju|jyu'],
			['じょ', 'jo|jyo'],
		],
		bya: [
			['びゃ', 'bya'],
			['びゅ', 'byu'],
			['びょ', 'byo'],
		],
		pya: [
			['ぴゃ', 'pya'],
			['ぴゅ', 'pyu'],
			['ぴょ', 'pyo'],
		],
		dya: [
			['ぢゃ', 'dya'],
			['ぢゅ', 'dyu'],
			['ぢょ', 'dyo'],
		],
	}
	let kanjiod = {
		unit2: [
			['一', 'いち', 'ichi', 'one'],
			['二', 'に', 'ni', 'two'],
			['三', 'さん', 'san', 'three'],
			['四', 'よん|し', 'yon|shi', 'four'],
			['五', 'ご', 'go', 'five'],
			['六', 'ろく', 'roku', 'six'],
			['七', 'なな|しち', 'nana|shichi', 'seven'],
			['八', 'はち', 'hachi', 'eight'],
			['九', 'きゅう', 'kyuu', 'nine'],
			['十', 'じゅう', 'jyuu|juu', 'ten'],
		],
		unit3: [
			['日', 'にち|に|び', 'nichi|ni|bi', 'day|sunday|date'],
			['本', 'ほん', 'hon', 'book'],
			['人', 'にん|じん|ひとり', 'nin|jin|hitori', 'person'],
		],
		unit7: [
			['月', 'げつ|がつ', 'getsu|gatsu', 'month|monday'],
			['日', 'にち|に|び', 'nichi|ni|bi', 'day|sunday|date'],
			['火', 'か', 'ka', 'fire|tuesday'],
			['水', 'すい', 'sui', 'water|wednesday'],
			['木', 'もく', 'moku', 'tree|thursday'],
			['金', 'きん', 'kin', 'gold|friday'],
			['土', 'ど', 'do', 'soil|saturday'],
			['曜', 'よう', 'you', 'weekday'],
			['休', 'やす|やすみ', 'yasu|yasumi', 'holiday|holidays'],
		]
	}
	// kanji, reading jp, reading ro, meaning
	let kanjios = {
		unit1: [
			['何', 'なん|なに', 'nan|nani', 'what'],
			['時', 'とき|じ', 'toki|ji', 'time|hour'],
			['分', 'ふん|ぶん|ぷん', 'fun|bun|pun', 'minute|minutes'],
			['半', 'はん', 'han', 'half|half past|half-past|halfpast'],
		],
		unit2: [
			['上', 'うえ', 'ue', 'above|up|over|on top|on top of'],
			['下', 'した', 'shita', 'below|down|under|beneath'],
			['中', 'なか', 'naka', 'inside|middle|center|in the middle'],
			['前', 'まえ', 'mae', 'before|in front of'],
		],
		unit3: [
			['学', 'がく', 'gaku', 'study|learn|learning'],
			['校', 'こう', 'kou', 'school|institute'],
			['年', 'ねん', 'nen', 'year|years'],
			['生', 'せい|しょう', 'sei|shou', 'life|student'],
		],
		unit4: [
			['春', 'はる', 'haru', 'spring'],
			['夏', 'なつ', 'natsu', 'summer'],
			['秋', 'あき', 'aki', 'autumn|fall'],
			['冬', 'ふゆ', 'fuyu', 'winter'],
		],
		unit5: [
			['百', 'ひゃく|びゃく|ぴゃく', 'hyaku|byaku|pyaku', '100|hundred|one hundred|a hundred'],
			['千', 'せん|ぜん', 'sen|zen', '1000|thousand|a thousand|one thousand'],
			['万', 'まん', 'man', '10000|ten thousand|a ten thousand'],
			['円', 'えん', 'en', 'yen|circle|yen coin'],
		],
		unit6: [
			['食', 'た', 'ta', 'eat|food|meal|to eat'],
			['飲', 'の', 'no', 'drink|beverage|to drink'],
			['行', 'い', 'i', 'to go|go|to go to'],
			['買', 'か', 'ka', 'buy|shop|to buy'],
			['安', 'やす', 'yasu', 'cheap|inexpensive|low'],
			['高', 'たか', 'taka', 'expensive|high|tall'],
		],
		unit7: [
			['手', 'て', 'te', 'hand'],
			['目', 'め', 'me', 'eye'],
			['耳', 'みみ', 'mimi', 'ear'],
			['口', 'くち', 'kuchi', 'mouth'],
			['大', 'だい|おお', 'dai', 'big|large'],
			['小', 'しょう|ちい', 'shou', 'small|little'],
		],
		unit8: [
			// watashi, otoko, onna, ka(kimasu), mi(masu), ki(kimasu), chichi, haha kanji
			['私', 'わたし|わたくし|し', 'watashi|watakushi|shi', 'I|me|myself'],
			['男', 'おとこ', 'otoko', 'man|male'],
			['女', 'おんな', 'onna', 'woman|female'],
			['書', 'か', 'ka', 'write|to write'],
			['見', 'み', 'mi', 'see|to see'],
			['聞', 'き', 'ki', 'hear|to hear'],
			['父', 'ちち', 'chichi', 'father|dad'],
			['母', 'はは', 'haha', 'mother|mum'],
		],
		unit9: [
			// migi, hidari, hai(rimasu),de(masu),higashi,nishi,minami,kita kanji
			['右', 'みぎ', 'migi', 'right'],
			['左', 'ひだり', 'hidari', 'left'],
			['入', 'はい', 'hai', 'enter|to enter'],
			['出', 'で', 'de', 'exit|to exit'],
			['東', 'ひがし', 'higashi', 'east'],
			['西', 'にし', 'nishi', 'west'],
			['南', 'みなみ', 'minami', 'south'],
			['北', 'きた', 'kita', 'north'],
		],
		unit10: [
			// mai, ima, shuu, sen, ki(masu), su(ndeimasu), su(ki), mei kanji
			['毎', 'まい', 'mai', 'every|each'],
			['今', 'いま|こん', 'ima|kon', 'now'],
			['週', 'しゅう', 'shuu', 'week'],
			['先', 'せん', 'sen', 'previous|last'],
			['来', 'き|く|こ|らい', 'ki|ko|ku|rai', 'come|to come'],
			['住', 'す|じゅう', 'su|juu|jyuu', 'live|to live|reside'],
			['好', 'す', 'su', 'like|to like'],
			['名', 'めい|な', 'mei|na', 'name'],
		],
		unit11: [
			// go, ei, uchi, tomo, a(imasu), sha, aida, machi
			['語', 'ご', 'go', 'word|language'],
			['英', 'えい', 'ei', 'english|england'],
			['家', 'うち|いえ|か', 'uchi|ie|ka', 'house|home|family'],
			['友', 'とも', 'tomo', 'friend'],
			['会', 'あ|かい', 'a|kai', 'meet|to meet'],
			['社', 'しゃ|じゃ', 'sha', 'company|corporation'],
			['間', 'あいだ|かん', 'aida|kan', 'between|among'],
			['町', 'まち', 'machi', 'town|city'],
		],
		unit12: [
			['新', 'あたら|しん', 'atara|shin', 'new'],
			['読', 'よ|どく', 'yo|doku', 'read|bookshop|to read'],
			['電', 'でん', 'den', 'electricity|electric'],
			['車', 'くるま|しゃ', 'kuruma|sha', 'car|vehicle'],
			['外', 'そと|がい', 'soto|gai', 'outside|outdoors'],
			['国', 'くに|こく', 'kuni|koku', 'country'],
			['話', 'はな|はなし|ワ', 'hana|hanashi|wa', 'tale|talk|to talk|to speak|speak'],
		]
	}

	function copy(obj) {
		return JSON.parse(JSON.stringify(obj))
	}

	let plainFormMapping = {
		'a': '～あ',
		'i': '～い',
		'u': '～う',
		'e': '～え',
		'ou': '～おう',
		'fpresent': 'Present (Formal) ～ます',
		'fpast': 'Past (Formal) ～ました',
		'fnegPresent': 'Negative Present (Formal) ～ません',
		'fnegPast': 'Negative Past (Formal) ～ませんでした',
		'fpleaseCommand': 'Please Command (Formal) ～てください',
		'fwant': 'Want (Formal) ～たいです',
		'flets': 'Lets (Formal) ～ましょう',
		'ipresent': 'Present (Informal) ～う/る',
		'ipast': 'Past (Informal) ～た',
		'inegPresent': 'Negative Present (Informal) ～ない',
		'inegPast': 'Negative Past (Informal) ～なかった',
		'icommand': 'Command (Informal) ～て',
		'iwant': 'Want (Informal) ～たい',
		'ilets': 'Lets (Informal) ～おう',
		'ichidan': 'Ichidan (Group 2) ～る',
		'godan': 'Godan (Group 1) ～う',
		'irregular': 'Irregular - する/くる',
	}

</script>

<h1 class="text-2xl font-semibold">Starting task</h1>
<div class="block md:grid grid-cols-2 w-full mt-2 gap-5">
	{#if !activeTask.plain}
	<div>
		<label class="text-lg m-2">
			<input type="radio" name="type" value={0} bind:group={activeTask.type} />
			Quiz
		</label> <br />
		<label class="text-lg m-2">
			<input type="radio" name="type" value={1} bind:group={activeTask.type} />
			Learn
		</label><br />
		<label class="text-lg m-2">
			<input type="radio" name="type" value={2} bind:group={activeTask.type} />
			Speed Skills
		</label> <br />
		{#if isDev}
			<label class="text-lg m-2">
				<input type="radio" name="type" value={3} bind:group={activeTask.type} />
				Test
			</label> <br />
		{/if}
	</div>
	<div>
		<div class="sm:block md:hidden m-5" />
		{#if !activeTask.kanji}
			<label class="text-lg m-2">
				<input type="radio" name="answerIn" bind:group={activeTask.answerIn} value={0} />
				Answer in Romaji
			</label> <br />
			<label class="text-lg m-2">
				<input type="radio" name="answerIn" bind:group={activeTask.answerIn} value={1} />
				Answer in Japanese
			</label> <br />
		{:else}
			<label class="text-lg m-2">
				<input type="radio" name="answerIn" bind:group={activeTask.answerIn} value={0} />
				Answer in Romaji
			</label> <br />
			<label class="text-lg m-2">
				<input type="radio" name="answerIn" bind:group={activeTask.answerIn} value={1} />
				Answer with Kanji
			</label> <br />
		{/if}
	</div>
	{/if}
	<div class="col-span-2 w-full bg-highlight p-2 rounded-lg lg:grid grid-cols-3 gap-5">
		<button class="{!activeTask.kanji && !activeTask.plain ? 'bg-main' : 'bg-highlight'} px-2 py-1 text-xl text-center rounded-lg" on:click={() => {activeTask.kanji=false;activeTask.plain=false}}>Hiragana/Katakana</button>
		<button class="{activeTask.kanji ? 'bg-main' : 'bg-highlight'} px-2 py-1 text-xl text-center rounded-lg" on:click={() => {activeTask.kanji=true;activeTask.plain=false}}>Kanji</button>
		<button class="{activeTask.plain ? 'bg-main' : 'bg-highlight'} px-2 py-1 text-xl text-center rounded-lg" on:click={() => {activeTask.kanji=false;activeTask.plain=copy(plainFormSchema)}}>Plain Form</button>
	</div>
	{#if !activeTask.kanji && !activeTask.plain}
		<div class="text-center">
			<h1 class="text-xl font-semibold">Hiragana</h1>
			<h2 class="text-lg font-semibold mt-2">Main Hiragana</h2>
			<div class="block gap-5 md:grid grid-cols-2 my-2 sm:m-5">
				<button
					class="btn-main col-span-2"
					on:click={() => {
						Object.keys(mainHiragana).forEach((item) => {
							let i = activeTask.hiragana.indexOf(item)
							if (i === -1) {
								activeTask.hiragana.push(item)
							} else {
								activeTask.hiragana.splice(i, 1)
							}
						})
						activeTask.hiragana = [...new Set(activeTask.hiragana)]
					}}>Toggle All</button
				>
				{#each Object.entries(mainHiragana) as [key, value]}
					<label>
						<input
							type="checkbox"
							class="peer hidden"
							bind:group={activeTask.hiragana}
							name="gana"
							value={key}
						/>
						<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2 md:my-0">
							{key}/{value[0][0]}
						</div>
					</label>
				{/each}
			</div>

			<h2 class="text-lg font-semibold mt-2">Dakuten Hiragana</h2>
			<div class="block gap-5 md:grid grid-cols-2 my-2 sm:m-5">
				<button
					class="btn-main col-span-2"
					on:click={() => {
						Object.keys(dakutenHiragana).forEach((item) => {
							let i = activeTask.hiragana.indexOf(item)
							if (i === -1) {
								activeTask.hiragana.push(item)
							} else {
								activeTask.hiragana.splice(i, 1)
							}
						})
						activeTask.hiragana = [...new Set(activeTask.hiragana)]
					}}>Toggle All</button
				>
				{#each Object.entries(dakutenHiragana) as [key, value]}
					<label>
						<input
							type="checkbox"
							class="peer hidden"
							bind:group={activeTask.hiragana}
							name="gana"
							value={key}
						/>
						<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2 md:my-0">
							{key}/{value[0][0]}
						</div>
					</label>
				{/each}
			</div>
			{#if activeTask.answerIn != 1}
				<h2 class="text-lg font-semibold mt-2">Combination Hiragana</h2>
				<div class="block gap-5 md:grid grid-cols-2 my-2 sm:m-5">
					<button
						class="btn-main col-span-2"
						on:click={() => {
							Object.keys(comboHiragana).forEach((item) => {
								let i = activeTask.hiragana.indexOf(item)
								if (i === -1) {
									activeTask.hiragana.push(item)
								} else {
									activeTask.hiragana.splice(i, 1)
								}
							})
							activeTask.hiragana = [...new Set(activeTask.hiragana)]
						}}>Toggle All</button
					>
					{#each Object.entries(comboHiragana) as [key, value]}
						<label>
							<input
								type="checkbox"
								class="peer hidden"
								bind:group={activeTask.hiragana}
								name="gana"
								value={key}
							/>
							<div
								class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2 md:my-0"
							>
								{key}/{value[0][0]}
							</div>
						</label>
					{/each}
				</div>
			{/if}
		</div>
		<div class="text-center">
			<h1 class="text-xl font-semibold">Katakana</h1>
			<h2 class="text-lg font-semibold mt-2">Main Katakana</h2>
			<div class="block gap-5 md:grid grid-cols-2 my-2 sm:m-5">
				<button
					class="btn-main col-span-2"
					on:click={() => {
						Object.keys(mainKatakana).forEach((item) => {
							let i = activeTask.katakana.indexOf(item)
							if (i === -1) {
								activeTask.katakana.push(item)
							} else {
								activeTask.katakana.splice(i, 1)
							}
						})
						activeTask.katakana = [...new Set(activeTask.katakana)]
					}}>Toggle All</button
				>
				{#each Object.entries(mainKatakana) as [key, value]}
					<label>
						<input
							type="checkbox"
							class="peer hidden"
							bind:group={activeTask.katakana}
							name="kana"
							value={key}
						/>
						<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2 md:my-0">
							{key}/{value[0][0]}
						</div>
					</label>
				{/each}
			</div>
			<h2 class="text-lg font-semibold mt-2">Dakuten Katakana</h2>
			<div class="block gap-5 md:grid grid-cols-2 my-2 sm:m-5">
				<button
					class="btn-main col-span-2"
					on:click={() => {
						Object.keys(dakutenKatakana).forEach((item) => {
							let i = activeTask.katakana.indexOf(item)
							if (i === -1) {
								activeTask.katakana.push(item)
							} else {
								activeTask.katakana.splice(i, 1)
							}
						})
						activeTask.katakana = [...new Set(activeTask.katakana)]
					}}>Toggle All</button
				>
				{#each Object.entries(dakutenKatakana) as [key, value]}
					<label>
						<input
							type="checkbox"
							class="peer hidden"
							bind:group={activeTask.katakana}
							name="kana"
							value={key}
						/>
						<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2 md:my-0">
							{key}/{value[0][0]}
						</div>
					</label>
				{/each}
			</div>
			{#if activeTask.answerIn != 1}
				<h2 class="text-lg font-semibold mt-2">Combination Katakana</h2>
				<div class="block gap-5 md:grid grid-cols-2 my-2 sm:m-5">
					<button
						class="btn-main col-span-2"
						on:click={() => {
							Object.keys(comboKatakana).forEach((item) => {
								let i = activeTask.katakana.indexOf(item)
								if (i === -1) {
									activeTask.katakana.push(item)
								} else {
									activeTask.katakana.splice(i, 1)
								}
							})
							activeTask.katakana = [...new Set(activeTask.katakana)]
						}}>Toggle All</button
					>
					{#each Object.entries(comboKatakana) as [key, value]}
						<label>
							<input
								type="checkbox"
								class="peer hidden"
								bind:group={activeTask.katakana}
								name="kana"
								value={key}
							/>
							<div
								class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2 md:my-0"
							>
								{key}/{value[0][0]}
							</div>
						</label>
					{/each}
				</div>
			{/if}
		</div>
	{:else if activeTask.kanji || !activeTask.plain}
			<div class="text-center">
				<h1 class="text-xl font-semibold">Obento Deluxe</h1>
				<label>
					<input
						type="checkbox"
						class="peer hidden"
						name="gana"
						value={kanjiod['unit2']}
						bind:group={activeTask.odkanji}
					/>
					<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
						Unit 2
					</div>
				</label>
				<label>
					<input
						type="checkbox"
						class="peer hidden"
						name="gana"
						value={kanjiod['unit3']}
						bind:group={activeTask.odkanji}
					/>
					<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
						Unit 3
					</div>
				</label>
				<label>
					<input
						type="checkbox"
						class="peer hidden"
						name="gana"
						value={kanjiod['unit7']}
						bind:group={activeTask.odkanji}
					/>
					<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
						Unit 7
					</div>
				</label>
			</div>
			<div class="text-center">
				<h1 class="text-xl font-semibold">Obento Supreme</h1>
				<label>
					<input
						type="checkbox"
						class="peer hidden"
						name="gana"
						value={kanjios['unit1']}
						bind:group={activeTask.oskanji}
					/>
					<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
						Unit 1
					</div>
				</label>
				<label>
					<input
						type="checkbox"
						class="peer hidden"
						name="gana"
						value={kanjios['unit2']}
						bind:group={activeTask.oskanji}
					/>
					<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
						Unit 2
					</div>
				</label>
				<label>
					<input
						type="checkbox"
						class="peer hidden"
						name="gana"
						value={kanjios['unit3']}
						bind:group={activeTask.oskanji}
					/>
					<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
						Unit 3
					</div>
				</label>
				<label>
					<input
						type="checkbox"
						class="peer hidden"
						name="gana"
						value={kanjios['unit4']}
						bind:group={activeTask.oskanji}
					/>
					<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
						Unit 4
					</div>
				</label>
				<label>
					<input
						type="checkbox"
						class="peer hidden"
						name="gana"
						value={kanjios['unit5']}
						bind:group={activeTask.oskanji}
					/>
					<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
						Unit 5
					</div>
				</label>
				<label>
					<input
						type="checkbox"
						class="peer hidden"
						name="gana"
						value={kanjios['unit6']}
						bind:group={activeTask.oskanji}
					/>
					<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
						Unit 6
					</div>
				</label>
				<label>
					<input
						type="checkbox"
						class="peer hidden"
						name="gana"
						value={kanjios['unit7']}
						bind:group={activeTask.oskanji}
					/>
					<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
						Unit 7
					</div>
				</label>
				<label>
					<input
						type="checkbox"
						class="peer hidden"
						name="gana"
						value={kanjios['unit8']}
						bind:group={activeTask.oskanji}
					/>
					<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
						Unit 8
					</div>
				</label>
				<label>
					<input
						type="checkbox"
						class="peer hidden"
						name="gana"
						value={kanjios['unit9']}
						bind:group={activeTask.oskanji}
					/>
					<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
						Unit 9
					</div>
				</label>
				<label>
					<input
						type="checkbox"
						class="peer hidden"
						name="gana"
						value={kanjios['unit10']}
						bind:group={activeTask.oskanji}
					/>
					<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
						Unit 10
					</div>
				</label>
				<label>
					<input
						type="checkbox"
						class="peer hidden"
						name="gana"
						value={kanjios['unit11']}
						bind:group={activeTask.oskanji}
					/>
					<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
						Unit 11
					</div>
				</label>
				<label>
					<input
						type="checkbox"
						class="peer hidden"
						name="gana"
						value={kanjios['unit12']}
						bind:group={activeTask.oskanji}
					/>
					<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
						Unit 12
					</div>
				</label>
			</div>
	{:else}
			<div class="lg:grid grid-cols-4 col-span-2 w-full gap-5">
				<div class="col-span-3 text-center">
					<p class="text-lg">Questions</p>
				</div>
				<div class="col-span-1 text-center">
					<p class="text-lg">Verb Groups</p>
				</div>
				<div>
					<h2 class="text-xl font-medium">Conjugations</h2>
					{#each plainFormSchemaFilled['answerIn']['conjugations'] as conj}
						<label>
							<input
								type="checkbox"
								class="peer hidden"
								name="gana"
								value={conj}
								bind:group={activeTask.plain.answerIn.conjugations}
							/>
							<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
								{plainFormMapping[conj]}
							</div>
						</label>
					{/each}
				</div>
				<div>
					<h2 class="text-xl font-medium">Formal</h2>
					{#each plainFormSchemaFilled['answerIn']['formal'] as item}
						<label>
							<input
								type="checkbox"
								class="peer hidden"
								name="gana"
								value={item}
								bind:group={activeTask.plain.answerIn.formal}
							/>
							<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
								{plainFormMapping['f' + item]}
							</div>
						</label>
					{/each}
				</div>
				<div>
					<h2 class="text-xl font-medium">Informal</h2>
					{#each plainFormSchemaFilled['answerIn']['informal'] as item}
						<label>
							<input
								type="checkbox"
								class="peer hidden"
								name="gana"
								value={item}
								bind:group={activeTask.plain.answerIn.informal}
							/>
							<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
								{plainFormMapping['i' + item]}
							</div>
						</label>
					{/each}
				</div>
				<div>
					<h2 class="text-xl font-medium">Verb Groups</h2>
					{#each plainFormSchemaFilled['groups'] as group}
						<label>
							<input
								type="checkbox"
								class="peer hidden"
								name="gana"
								value={group}
								bind:group={activeTask.plain.groups}
							/>
							<div class="bg-highlight peer-checked:bg-main p-2 rounded-md hover:cursor-pointer my-2">
								{plainFormMapping[group]}
							</div>
						</label>
					{/each}
				</div>
				<div class="col-span-4">
					<h2 class="text-xl font-medium text-center mb-2">Number of questions</h2>
					<div class="w-full bg-highlight p-2 rounded-lg lg:grid grid-cols-5 gap-5">
						<button class="{activeTask.plain.questions == 20 ? 'bg-main' : 'bg-highlight'} px-2 py-1 text-xl text-center rounded-lg" on:click={() => {activeTask.plain.questions = 20}}>20</button>
						<button class="{activeTask.plain.questions == 40 ? 'bg-main' : 'bg-highlight'} px-2 py-1 text-xl text-center rounded-lg" on:click={() => {activeTask.plain.questions = 40}}>40</button>
						<button class="{activeTask.plain.questions == 60 ? 'bg-main' : 'bg-highlight'} px-2 py-1 text-xl text-center rounded-lg" on:click={() => {activeTask.plain.questions = 60}}>60</button>
						<button class="{activeTask.plain.questions == 80 ? 'bg-main' : 'bg-highlight'} px-2 py-1 text-xl text-center rounded-lg" on:click={() => {activeTask.plain.questions = 80}}>80</button>
						<button class="{activeTask.plain.questions == 100? 'bg-main' : 'bg-highlight'} px-2 py-1 text-xl text-center rounded-lg" on:click={() => {activeTask.plain.questions = 100}}>100</button>
					</div>
				</div>
				
			</div>
	{/if}
	<div class="col-span-2 text-center">
		<button class="btn-main" on:click={startTask}>Start Game!</button>
		{#if invalid}
			<p class="text-red-500">Please select an option.</p>
		{/if}
	</div>
</div>
