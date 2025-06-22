<template>
    <div class="avatar-container">
        <el-dialog title="编辑头像" :model-value="model" width="800px" append-to-body @close="closeDialog">
            <el-row style="height: 300px">
                <el-col :span="12">
                    <vue-cropper autoCropWidth="200" autoCropHeight="200" ref="cropper" :img="imageUrl" autoCrop
                        :fixedBox="true" @realTime="realTime" />
                </el-col>
                <el-col :span="12">
                    <div class="preview-box">
                        <img :src="previewUrl" />
                    </div>
                </el-col>
            </el-row>
            <el-row style="margin-top: 12px">
                <el-col :span="12">
                    <el-row>
                        <el-col :span="8">
                            <el-upload ref="uploadRef" :auto-upload="false" :before-upload="beforeUpload"
                                :on-change="onChange">
                                <template #trigger>
                                    <el-button type="primary">选择</el-button>
                                </template>
                            </el-upload>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :offset="6" :span="4">
                    <el-button type="primary">上传</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import { ref, reactive, watch } from 'vue'

const model = defineModel()

// 左侧预览
const imageUrl = ref('https://shnhz.github.io/shn-ui/img/Koala.jpg')

// 右侧预览
const previewUrl = ref()

const beforeUpload = (rawFile: UploadRawFile) => {
    console.log('rawFile', rawFile);
}

const onChange = (uploadFile: UploadFile) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
        previewUrl.value = reader.result
        imageUrl.value = reader.result as any
    })

    reader.readAsDataURL(uploadFile.raw as any)

}

import type { UploadFile, UploadInstance, UploadRawFile } from 'element-plus'

const uploadRef = ref<UploadInstance>()


const cropper = ref()
// 实时预览事件
const realTime = (data: any) => {
    cropper.value.getCropData((res: any) => {
        previewUrl.value = res
    })

}
const closeDialog = () => {
    model.value = false
}


</script>

<style lang='scss' scoped>
.preview-box {
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 1px solid #ccc;
    overflow: hidden;
}
</style>