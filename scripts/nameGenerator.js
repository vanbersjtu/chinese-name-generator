// 示例名字数据库
const nameDatabase = {
    characters: {
        mi: { char: '米', meaning: 'rice', cultural: 'Symbol of prosperity' },
        mai: { char: '麦', meaning: 'wheat', cultural: 'Symbol of harvest' },
        ming: { char: '明', meaning: 'bright', cultural: 'Represents wisdom and clarity' },
        kai: { char: '凯', meaning: 'triumph', cultural: 'Victory and celebration' },
        ke: { char: '克', meaning: 'overcome', cultural: 'Strength and capability' },
        le: { char: '乐', meaning: 'joy', cultural: 'Happiness and contentment' },
        long: { char: '龙', meaning: 'dragon', cultural: 'Power and nobility' },
        luo: { char: '洛', meaning: 'river', cultural: 'Flow of life' }
    }
};

// 英文音素到中文音译的映射
const phoneticMapping = {
    // 元音映射
    a: ['阿', '艾', '安', '爱'],
    e: ['厄', '埃', '叶', '伊'],
    i: ['伊', '依', '易', '意'],
    o: ['奥', '欧', '鸥', '澳'],
    u: ['乌', '无', '武', '宇'],
    
    // 辅音映射
    b: ['贝', '柏', '班', '博'],
    c: ['克', '卡', '科', '凯'],
    d: ['德', '达', '丹', '道'],
    f: ['弗', '芙', '菲', '方'],
    g: ['格', '戈', '高', '古'],
    h: ['赫', '海', '汉', '胡'],
    j: ['杰', '吉', '金', '江'],
    k: ['凯', '克', '科', '康'],
    l: ['莱', '兰', '路', '李'],
    m: ['麦', '米', '马', '明'],
    n: ['尼', '娜', '纳', '诺'],
    p: ['帕', '佩', '珀', '普'],
    q: ['奇', '琪', '齐', '秋'],
    r: ['雷', '瑞', '若', '然'],
    s: ['斯', '史', '山', '森'],
    t: ['特', '图', '托', '泰'],
    v: ['维', '文', '万', '威'],
    w: ['维', '韦', '温', '万'],
    x: ['希', '西', '席', '夏'],
    y: ['伊', '雅', '叶', '优'],
    z: ['泽', '志', '祖', '宗']
};

// 常用中文名字字库
const nameCharacters = {
    // 阳刚之气
    masculine: ['强', '伟', '勇', '军', '明', '建', '光', '天', '永', '志', '智', '辉'],
    // 温婉气质
    feminine: ['婷', '雅', '美', '静', '丽', '慧', '文', '馨', '芳', '萍', '洁', '云'],
    // 中性字
    neutral: ['安', '和', '平', '乐', '康', '宁', '真', '善', '美', '信', '德', '义'],
    // 表示美好寓意的字
    positive: ['祥', '瑞', '福', '禄', '寿', '喜', '吉', '泰', '顺', '兴', '旺', '盛'],
    // 自然意象
    nature: ['山', '川', '海', '林', '风', '雨', '雪', '月', '星', '日', '云', '天']
};

// 百家姓数据
const chineseSurnames = [
    '赵', '钱', '孙', '李', '周', '吴', '郑', '王',
    '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨',
    '朱', '秦', '尤', '许', '何', '吕', '施', '张',
    '孔', '曹', '严', '华', '金', '魏', '陶', '姜',
    '戚', '谢', '邹', '喻', '柏', '水', '窦', '章',
    '云', '苏', '潘', '葛', '奚', '范', '彭', '郎',
    '鲁', '韦', '昌', '马', '苗', '凤', '花', '方',
    '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐',
    '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤',
    '滕', '殷', '罗', '毕', '郝', '邬', '安', '常',
    '乐', '于', '时', '傅', '皮', '卞', '齐', '康',
    '伍', '余', '元', '卜', '顾', '孟', '平', '黄',
    '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪',
    '祁', '毛', '禹', '狄', '米', '贝', '明', '臧',
    '计', '伏', '成', '戴', '谈', '宋', '茅', '庞',
    '熊', '纪', '舒', '屈', '项', '祝', '董', '梁',
    '杜', '阮', '蓝', '闵', '席', '季', '麻', '强',
    '贾', '路', '娄', '危', '江', '童', '颜', '郭',
    '梅', '盛', '林', '刁', '钟', '徐', '邱', '骆',
    '高', '夏', '蔡', '田', '樊', '胡', '凌', '霍'
];

// 处理表单提交
document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const englishName = document.getElementById('englishName').value.trim();
    if (englishName) {
        generateNames(englishName);
    }
});

// 获取英文名的音素特征
function getPhoneticFeatures(name) {
    name = name.toLowerCase();
    let features = [];
    let i = 0;
    
    while (i < name.length) {
        // 处理特殊音素组合
        if (i < name.length - 1) {
            const pair = name.substr(i, 2);
            if (['th', 'ch', 'sh', 'ph'].includes(pair)) {
                features.push(pair);
                i += 2;
                continue;
            }
        }
        features.push(name[i]);
        i++;
    }
    
    return features;
}

// 根据音素选择合适的中文字
function getChineseChar(phonetic, position, gender) {
    let candidates = phoneticMapping[phonetic] || [];
    
    // 根据位置和性别选择合适的字
    if (position === 0) { // 姓氏位置
        candidates = candidates.filter(char => isCommonSurname(char));
    } else if (position === 1) { // 名字第一字
        candidates = candidates.concat(
            gender === 'male' ? nameCharacters.masculine : nameCharacters.feminine
        );
    } else { // 名字其他位置
        candidates = candidates.concat(nameCharacters.neutral, nameCharacters.positive);
    }
    
    // 随机选择一个字
    return candidates[Math.floor(Math.random() * candidates.length)];
}

// 判断是否为常用姓氏
function isCommonSurname(char) {
    const commonSurnames = ['李', '王', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴'];
    return commonSurnames.includes(char);
}

// 生成名字的文化解读
function generateInterpretation(chars) {
    let meaning = '';
    let cultural = '';
    
    // 生成整体含义
    meaning = `Represents ${getCharacterTrait(chars)} and ${getCharacterAspiration(chars)}`;
    
    // 生成文化内涵
    cultural = `Combines elements of ${getCharacterElements(chars)} in Chinese culture`;
    
    return { meaning, cultural };
}

// 获取性格特征
function getCharacterTrait(chars) {
    const traits = ['wisdom', 'kindness', 'strength', 'elegance', 'courage'];
    return traits[Math.floor(Math.random() * traits.length)];
}

// 获取抱负特征
function getCharacterAspiration(chars) {
    const aspirations = ['success', 'harmony', 'prosperity', 'achievement', 'excellence'];
    return aspirations[Math.floor(Math.random() * aspirations.length)];
}

// 获取文化元素
function getCharacterElements(chars) {
    const elements = ['traditional virtues', 'natural elements', 'classical literature', 'ancient wisdom'];
    return elements[Math.floor(Math.random() * elements.length)];
}

// 生成名字
function generateNames(englishName) {
    const features = getPhoneticFeatures(englishName);
    const gender = detectGender(englishName);
    
    // 生成三个不同的名字建议
    const suggestions = [];
    for (let i = 0; i < 3; i++) {
        const chineseChars = [];
        
        // 随机选择一个百家姓
        const surname = chineseSurnames[Math.floor(Math.random() * chineseSurnames.length)];
        chineseChars.push(surname);
        
        // 生成两个字的名字部分
        for (let j = 0; j < 2; j++) {
            const char = getChineseChar(features[j % features.length], j + 1, gender);
            chineseChars.push(char);
        }
        
        const chineseName = chineseChars.join('');
        const pinyin = generatePinyin(chineseChars);
        const { meaning, cultural } = generateInterpretation(chineseChars);
        
        suggestions.push({
            chinese: chineseName,
            pinyin: pinyin,
            meaning: meaning,
            cultural: cultural,
            characters: chineseChars.map((char, index) => ({
                char: char,
                pinyin: getPinyinForChar(char),
                meaning: index === 0 ? 
                    `Traditional Chinese surname - ${getCharacterMeaning(char)}` : 
                    getCharacterMeaning(char)
            }))
        });
    }
    
    displayResults(suggestions);
}

// 简单的性别检测
function detectGender(name) {
    const femaleNames = ['mary', 'elizabeth', 'jennifer', 'emma', 'alice', 'sarah'];
    const maleNames = ['john', 'james', 'william', 'michael', 'david', 'robert'];
    
    name = name.toLowerCase();
    if (femaleNames.includes(name)) return 'female';
    if (maleNames.includes(name)) return 'male';
    return Math.random() < 0.5 ? 'male' : 'female';
}

// 生成拼音（简化版）
function generatePinyin(chars) {
    return chars.map(char => getPinyinForChar(char)).join(' ');
}

// 获取单个汉字的拼音（扩展版）
function getPinyinForChar(char) {
    const pinyinMap = {
        // 百家姓拼音映射
        '赵': 'Zhao', '钱': 'Qian', '孙': 'Sun', '李': 'Li', '周': 'Zhou', 
        '吴': 'Wu', '郑': 'Zheng', '王': 'Wang', '冯': 'Feng', '陈': 'Chen',
        '褚': 'Chu', '卫': 'Wei', '蒋': 'Jiang', '沈': 'Shen', '韩': 'Han',
        '杨': 'Yang', '朱': 'Zhu', '秦': 'Qin', '许': 'Xu', '何': 'He',
        '张': 'Zhang', '孔': 'Kong', '曹': 'Cao', '严': 'Yan', '华': 'Hua',
        
        // 常用字拼音映射
        '明': 'Ming', '华': 'Hua', '龙': 'Long', '凤': 'Feng', '天': 'Tian',
        '海': 'Hai', '山': 'Shan', '川': 'Chuan', '福': 'Fu', '德': 'De',
        '安': 'An', '康': 'Kang', '宁': 'Ning', '静': 'Jing', '雅': 'Ya',
        '芳': 'Fang', '文': 'Wen', '武': 'Wu', '英': 'Ying', '华': 'Hua',
        '美': 'Mei', '丽': 'Li', '慧': 'Hui', '智': 'Zhi', '勇': 'Yong'
    };
    return pinyinMap[char] || char;
}

// 获取汉字含义（扩展版）
function getCharacterMeaning(char) {
    const meaningMap = {
        // 百家姓含义
        '赵': 'Ancient state of Zhao',
        '钱': 'Money, wealth',
        '孙': 'Descendant',
        '李': 'Plum tree',
        '周': 'Cycle, complete',
        '吴': 'Ancient state of Wu',
        '郑': 'Ancient state of Zheng',
        '王': 'King, royal',
        
        // 常用字含义
        '明': 'Bright, clear, intelligent',
        '华': 'Splendid, magnificent',
        '龙': 'Dragon - symbol of power',
        '凤': 'Phoenix - grace and nobility',
        '天': 'Heaven, sky - represents aspiration',
        '海': 'Ocean - vast and profound',
        '山': 'Mountain - stable and dignified',
        '福': 'Fortune, blessing',
        '德': 'Virtue, morality',
        '安': 'Peace, tranquility',
        '康': 'Health, wellness',
        '宁': 'Peaceful, serene',
        '静': 'Quiet, calm',
        '雅': 'Elegant, refined',
        '芳': 'Fragrant, virtuous',
        '文': 'Culture, literature',
        '武': 'Martial, strength',
        '英': 'Hero, outstanding',
        '美': 'Beautiful, precious',
        '丽': 'Beautiful, graceful',
        '慧': 'Intelligent, wise',
        '智': 'Wisdom, knowledge',
        '勇': 'Brave, courageous'
    };
    return meaningMap[char] || 'A meaningful character in Chinese culture';
}

// 显示结果
function displayResults(suggestions) {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = '';
    const template = document.getElementById('nameCardTemplate');

    suggestions.forEach(suggestion => {
        const nameCard = template.content.cloneNode(true);
        
        // 填充名字卡片内容
        nameCard.querySelector('.chinese-name').textContent = suggestion.chinese;
        nameCard.querySelector('.pinyin').textContent = suggestion.pinyin;
        nameCard.querySelector('.meaning').textContent = suggestion.meaning;
        nameCard.querySelector('.cultural').textContent = suggestion.cultural;

        // 填充字符分析
        const charactersDiv = nameCard.querySelector('.characters');
        suggestion.characters.forEach(char => {
            const charDiv = document.createElement('div');
            charDiv.innerHTML = `
                <strong>${char.char}</strong>
                <div>${char.pinyin}</div>
                <small>${char.meaning}</small>
            `;
            charactersDiv.appendChild(charDiv);
        });

        // 添加保存功能
        const saveButton = nameCard.querySelector('.save-button');
        saveButton.addEventListener('click', () => saveName(suggestion));

        resultsSection.appendChild(nameCard);
    });
}

// 保存名字
function saveName(nameData) {
    // 这里可以实现保存到本地存储或发送到服务器的逻辑
    alert(`Name "${nameData.chinese}" (${nameData.pinyin}) has been saved!`);
}
