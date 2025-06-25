<template>
    <div class="audio-container">
        <div ref="wavesurferRef" />
    </div>

    <div class="audio-time">
        <span :style="{ color: '#81888f' }">00:00</span>
        <h1>{{ curTime }}</h1>
        <span :style="{ color: '#81888f' }">{{ totalTime }}</span>
    </div>

    <div class="action-container">

        <!--  todo: width最小只能150px -->
        <el-popover content="后退(可长按)">
            <template #reference>
                <el-button circle v-longpress:200:100="() => wavesurfer.skip(-1)">
                    <Icon name="icon-houtui"></Icon>
                </el-button>
            </template>
        </el-popover>

        <el-button @click="backward()">后退5s</el-button>

        <el-button circle @click="wavesurfer.playPause()">
            <Icon name="icon-zanting" v-if="isPlaying"></Icon>
            <Icon name="icon-bofang" v-else></Icon>
        </el-button>

        <el-button @click="forward()">前进5s</el-button>


        <el-popover content="快进(可长按)">
            <template #reference>
                <el-button circle v-longpress:200:100="() => wavesurfer.skip(1)">
                    <Icon name="icon-kuaijin"></Icon>
                </el-button>
            </template>
        </el-popover>

        <div class="speed">
            <div class="speed-desc">播放速度</div>
            <el-slider @change="changeRate()" v-model="playRate" :min="0.6" :max="2" :step="0.2" show-stops />
        </div>


    </div>

</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import WaveSurfer from 'wavesurfer.js'
const wavesurfer = ref()
const wavesurferRef = ref();
const loading = ref(true);


// 音频播放速率
const playRate = ref(1)
// 音频总时长（格式化后 mm:ss）
const totalTime = ref();
// 音频总时长（单位秒）
const totalSecondTime = ref();
// 音频当前播放位置时长
const curTime = ref();
// 音频是否正在播放
const isPlaying = ref(false);

// 改变播放速率
const changeRate = () => {
    wavesurfer.value.setPlaybackRate(playRate.value, true)
    wavesurfer.value.play()
}

const forward = () => {
    wavesurfer.value.skip(5)
}

const backward = () => {
    wavesurfer.value.skip(-5)
}

function init() {
    wavesurfer.value = WaveSurfer.create({
        height: 120,
        autoplay: false,
        container: wavesurferRef.value,
        waveColor: "rgb(200, 0, 200)",
        progressColor: "rgb(100, 0, 100)",
        cursorColor: "rgb(64, 158, 255)",
        cursorWidth: 4,
        audioRate: 1,
        url: '/../../../../public/test.mp3'   // 音频地址，使用的是 vite，将文件放到根目录 public 下才有用!!!
    })
    // 音频被解码后触发
    wavesurfer.value.on("decode", () => {
        loading.value = false
    });


    // 当音频已解码并可以播放时触发
    wavesurfer.value.on("ready", () => {
        if (!wavesurfer.value) return;
        const { decodedData } = wavesurfer.value;
        totalSecondTime.value = decodedData.duration;

        totalTime.value = formatTime(decodedData.duration);
        // 光标位置取中
        wavesurfer.value.setTime(decodedData.duration / 2);

    });

    // 音频播放时触发
    wavesurfer.value.on("play", () => (isPlaying.value = true));

    // 音频暂停时触发
    wavesurfer.value.on("pause", () => (isPlaying.value = false));

    // 音频位置改变时，播放期间连续触发
    wavesurfer.value.on("timeupdate", (timer: any) => {
        if (timer > totalSecondTime.value) return;
        curTime.value = formatTime(timer);
    });

}


onMounted(() => {
    init()
})

onBeforeUnmount(() => {
    if (wavesurfer.value) {
        wavesurfer.value.destroy();
        wavesurfer.value = null;
    }
});

const formatTime = (seconds: number) => {
    if (seconds < 0) seconds = 0;

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    // 格式化为两位数 (mm:ss)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
</script>

<style scoped lang="scss">
.audio-container {
    width: 100%;
    height: 200px;
}

.action-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.audio-time {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
}

.speed {

    .speed-desc {
        width: 100px;
        margin: 10px;
    }

    align-items: center;
    display: flex;
    width: 300px;
}
</style>