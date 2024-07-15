<script>
	import { onMount } from "svelte";
    import * as wanakana from 'wanakana'


    export let activeTask // The active task object
	export let userData // Self-explanatory
	export let sTask // Start task
	export let streaks // Obselete

    // In here, we don't need to save out the game state, including correct/incorrect answers
    // Only need to save points
    let { plain } = activeTask // For easy access 

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
            "あば",
            "あび",
            "あぶ",
            "あべ",
            "あぼう",
            "あんで",
            "あんだ"
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
			'ichidan', 'godan', 'irregular'
		],
		questions: 20,
	}

    let input = ''
    let current = {
        answer: '', // e.g. hashirimasu
        verbFrom: '', // e.g. hashiru
        type: '', // e.g. formal (|informal|conjugation)
        tense: '', // e.g. present (|past|future)
        nudge: '', // text for above box
        color: 0, // 0 pink, 1 green, 2 red
        input: '', // user input
        conj: '', // conjugation e.g. 'a' or 'ipresent'
        correct: true, // bool for correct, false if one attempt is wrong
    }
    let index = 0

    function fillQuestions() {
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

    let questions = fillQuestions()
    let imeInput
    let progBar

    onMount(() => {
        wanakana.bind(imeInput, { IMEMode: 'toHiragana' })
        imeInput.focus()
    })
    
    let conjHintMapping = {
        'a': 'Hint: Ends with /a/ sound',
        'i': 'Hint: Ends with /i/ sound',
        'u': 'Hint: Ends with /u/ sound',
        'e': 'Hint: Ends with /e/ sound',
        'ou': 'Hint: Ends with /ou/ sound',
        'fpresent': 'Hint: Ends with /i/ます',
        'ipresent': 'Hint: Ends with /u/',
        'fpast': 'Hint: Ends with /i/ました',
        'ipast': 'Hint: Ends with /ta/',
        'fnegPresent': 'Hint: Ends with /i/ません',
        'inegPresent': 'Hint: Ends with /a/ない',
        'fnegPast': 'Hint: Ends with /i/ませんでした',
        'inegPast': 'Hint: Ends with /a/なかった',
        'fpleaseCommand': 'Hint: Ends with /te/ください',
        'icommand': 'Hint: Ends with /te/',
        'fwant': 'Hint: Ends with /i/たいです',
        'iwant': 'Hint: Ends with /i/たい',
        'flets': 'Hint: Ends with /i/ましょう',
        'ilets': 'Hint: Ends with /ou/',
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

    function handleSubmit() {
        questions[index]["input"] = wanakana.toHiragana(questions[index]["input"])
        questions[index]["input"] = questions[index]["input"].replace(/[^あ-ん]/g, '')
        if (questions[index]["input"] == questions[index]["answer"]) {
            index++
        } else {
            console.log(questions[index]["answer"], questions[index]["input"])
            questions[index]["color"] = 2
            questions[index]["correct"] = false
            questions[index]["nudge"] = 'Incorrect! ' + conjHintMapping[questions[index]["conj"]]
        }

        if (index >= questions.length) {
            // End of questions
            console.log('End of questions')
            finished()
        }

        if (progBar) { 
            progBar.style.width = (index / questions.length) * 100 + '%'
        }
    }

    let finish = false
    let viewingResults = false
    
    let percentage = 0
    let completedStr = ''
    let totalCorrect = 0
    function finished() {
        totalCorrect = questions.reduce((acc, cur) => {
            return acc + (cur.correct ? 1 : 0)
        }, 0)
        percentage = Math.round((totalCorrect / questions.length) * 100)

        let completedStrs = []

        if (plain.answerIn.conjugations.length > 0) {
            // Using the Intl ListFormat API, list the conjugations
            let list = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })
            let conjs = plain.answerIn.conjugations.map((i) => {
                return plainFormMapping[i]
            })
            completedStrs.push(list.format(conjs) + ' conjugations')
        }
        if (plain.answerIn.formal.length > 0) {
            let list = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })
            let formals = plain.answerIn.formal.map((i) => {
                return plainFormMapping['f' + i]
            })
            completedStrs.push(list.format(formals) + ' form' + (plain.answerIn.formal.length > 1 ? 's' : ''))
        }
        if (plain.answerIn.informal.length > 0) {
            let list = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })
            let informals = plain.answerIn.informal.map((i) => {
                return plainFormMapping['i' + i]
            })
            completedStrs.push(list.format(informals) + ' form' + (plain.answerIn.informal.length > 1 ? 's' : ''))
        }
        let list = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })
        completedStr = list.format(completedStrs)
        finish = true

        // Points
        let points = 0
        points += totalCorrect

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

        points += Math.floor(conjugations.length / 5) * 5
        
    }

    let obj = {}
    function viewResults() {
        questions.forEach(question => {
            if (obj?.[question["conj"]]) {
                obj[question["conj"]]["questions"].push(question)
            } else {
                obj[question["conj"]] = {
                    totalCorrect: 0,
                    total: 0,
                    questions: [question]
                }
            }
        })

        Object.keys(obj).forEach(key => {
            obj[key]["totalCorrect"] = obj[key]["questions"].reduce((acc, cur) => {
                return acc + (cur.correct ? 1 : 0)
            }, 0)
            obj[key]["total"] = obj[key]["questions"].length
        })
        viewingResults = true
        finish = false
    }

</script>

{#if finish}
    <div class="w-full h-full grid place-content-center overflow-hidden">
        {#if percentage >= 80}
            <div class="text-center">
                <h1 class="text-4xl text-correct font-semibold">Well done!</h1>
                <p class="text-correct my-2.5">
                    You have successfully completed {completedStr}!
                </p>
                <button
                    class="btn-main"
                    on:click={() => {
                        activeTask = null
                        sTask = false
                    }}>← Go back to your dashboard</button
                >
                <button class="btn-main" on:click={viewResults}>View in-depth results →</button>
            </div>
        {:else}
            <div class="text-center">
                <h1 class="text-4xl text-incorrect font-semibold">Nice try</h1>
                <p class="text-incorrect my-2.5">
                    You didn't manage to complete {completedStr}. Try again next time.
                </p>
                <button
                    class="btn-main"
                    on:click={() => {
                        activeTask = null
                        sTask = false
                    }}>← Go back to your dashboard</button
                >
                <button class="btn-main" on:click={viewResults}>View in-depth results →</button>
            </div>
        {/if}
    </div>
{:else if viewingResults}
    <h1 class="text-2xl font-semibold">
        You got <span class="text-main">{totalCorrect}</span> correct out of
        <span class="text-main">{questions.length}</span>, with a score of <span class="text-main">{percentage}%</span>.
    </h1>
    <h2 class="text-xl mt-2 font-semibold">Here's your breakdown:</h2>
    <div class="block md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5">
        {#each Object.entries(obj) as [conj, info]}
            <div class="m-2 bg-highlight p-5 text-center rounded-lg">
                <h1 class="text-4xl font-jp">～{plainFormMapping[conj].split('～')[1]}</h1>
                <h2 class="text-base italic font-medium mt-1">{plainFormMapping[conj].split('～')[0]}</h2>
                <h2 class="text-xl font-medium mt-1">{Math.round((info.totalCorrect / info.total) * 100)}% correct</h2>
                <h3 class="text-lg mt-1">{info.totalCorrect}/{info.total}</h3>
            </div>
        {/each}
    </div>

    <button
        class="btn-main"
        on:click={() => {
            activeTask = null
            sTask = false
        }}>← Go back to your dashboard</button
    >

{:else}
    <div class="flex flex-col justify-between items-center w-full h-full overflow-hidden pb-14">
        <div></div>
        <div class="text-center">
            <h1 class="text-6xl font-semibold font-jp">{questions[index]["verbFrom"]} → {questions[index]["tense"]}</h1>
            <p class="italic mt-2">Convert to {questions[index]["type"]} {questions[index]["tense"]}</p>
        </div>
        <form class="pb-5" on:submit|preventDefault={handleSubmit}>
            <p class="text-base text-center {questions[index]["color"] == 0 ? 'text-main' : questions[index]["color"] == 1 ? 'text-correct' : 'text-incorrect'}">{questions[index]["nudge"]}</p>
            <input type="text" class="m-2 text-lg border-2 rounded-lg {questions[index]["color"] == 0 ? 'border-main' : questions[index]["color"] == 1 ? 'border-correct' : 'border-incorrect'} outline-none px-3 py-2 min-w-[25vw]" placeholder="Answer" bind:value={questions[index]["input"]} bind:this={imeInput} />
        </form>

    </div>
    <div class="fixed bottom-0 left-0 w-[calc(100vw-80px)] m-10">
        <div class="w-full h-5 rounded-full bg-highlight">
            <div class="bg-main h-5 rounded-full w-0 tbar2" bind:this={progBar} id="progressBar" />
        </div>
    </div>
{/if}