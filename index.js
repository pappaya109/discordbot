const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
// 봇 초기화
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

// 토큰 설정
const TOKEN = config.token;
const TARGET_CHANNEL_ID = '1304429163427663875'; // 특정 채널 ID

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// 스레드 생성 이벤트
client.on('threadCreate', async (thread) => {
    try {
        // 특정 부모 채널들의 ID 배열
        const targetChannelIds = ['CHANNEL_ID_1', 'CHANNEL_ID_2', 'CHANNEL_ID_3']; // 채널 ID 입력

        // 부모 채널 확인 (ID가 배열에 포함되어 있는지 체크)
        if (!targetChannelIds.includes(thread.parentId)) {
            return; // 특정 채널들이 아니라면 무시
        }

        // 로그를 남길 채널 ID
        const logChannelId = 'LOG_CHANNEL_ID'; // 로그 채널 ID 입력
        const logChannel = thread.guild.channels.cache.get(logChannelId);

        if (!logChannel || !logChannel.isTextBased()) {
            console.error('로그 채널을 찾을 수 없거나 텍스트 채널이 아닙니다.');
            return;
        }

        // 스레드 생성자 정보 가져오기
        const creatorId = thread.ownerId; // 스레드를 생성한 사용자 ID
        const creator = await thread.guild.members.fetch(creatorId); // 사용자 정보 가져오기

        // 부모 채널 정보 가져오기
        const parentChannel = thread.parent; // 부모 채널 객체
        const parentChannelName = parentChannel ? parentChannel.name : '알 수 없음';

        // 로그 메시지 생성
        const logMessage = `특정 채널에서 새 스레드가 생성되었습니다:
- 스레드 이름: ${thread.name} (ID: ${thread.id})
- 스레드 URL: ${thread.url}
- 생성자: ${creator.user.tag} (ID: ${creatorId})
- 부모 채널: ${parentChannelName} (ID: ${parentChannel?.id || '알 수 없음'})`;

        // 로그 채널에 메시지 보내기
        await logChannel.send(logMessage);
        console.log('스레드 생성 로그 메시지를 전송했습니다.');
    } catch (error) {
        console.error('스레드 로그를 전송하는 중 오류 발생:', error);
    }
});

// 봇 로그인
client.login(TOKEN); // 봇 토큰 입력