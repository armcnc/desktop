<template>
    <div class="signal-view">
        <div class="signal-box">
            <div class="box-item">
                <el-form class="cnc" :model="props.cnc.machine.item" label-width="120px">
                    <el-form-item label="主轴方向">
                        <el-button class="info" type="primary">翻转方向</el-button>
                    </el-form-item>
                    <el-form-item label="主轴启停">
                        <el-button class="info" type="primary">翻转信号</el-button>
                    </el-form-item>
                    <el-form-item label="冷却液开关">
                        <el-button class="info" type="primary">翻转信号</el-button>
                    </el-form-item>
                    <el-form-item label="对刀仪">
                        <el-button class="info" type="primary">翻转信号</el-button>
                    </el-form-item>
                    <el-form-item label="急停开关">
                        <el-button class="info" type="primary">翻转信号</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="box-item">
                <el-form class="cnc" :model="props.cnc.machine.item" label-width="120px">
                    <el-form-item :label="item + '轴'" v-for="(item, index) in props.cnc.machine.item.joints" :key="index">
                        <el-button class="info" type="primary">翻转方向</el-button>
                        <el-button class="info" type="primary">翻转脉冲</el-button>
                        <el-button class="info" type="primary">翻转限位信号</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted} from "vue";
import * as icons from "@element-plus/icons";
export default defineComponent({
    name: "SignalMachine",
    emits: [],
    props: ["cnc", "item"],
    components: {},
    setup(props, context) {

        onBeforeMount(() => {});

        onMounted(() => {});

        onBeforeUnmount(() => {});

        onUnmounted(() => {});

        return {
            props,
            icons
        }
    }
});
</script>

<style scoped>
.signal-view{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 30px;
}
.signal-view .signal-box{
    width: 100%;
    max-width: 844px;
    margin: 0 auto;
}
.signal-view .signal-box .box-item{
    width: 100%;
    padding: 30px 20px;
    background-color: rgba(43, 45, 48, .3);
    margin-bottom: 20px;
    border-radius: 4px;
    position: relative;
}
.signal-view .signal-box .box-item .title{
    color: #999999;
    margin-bottom: 20px;
}
</style>
