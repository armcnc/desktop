<template>
    <div class="header-main">
        <div class="header-item">
            <div class="item logo"></div>
            <div class="item menu">
                <el-icon><Grid /></el-icon>
                <div class="dropdown">
                    <div class="dropdown-item" @click="onReload">
                        <div class="dropdown-item-item">
                            <el-icon><Refresh /></el-icon>
                        </div>
                        <div class="dropdown-item-item">
                            <span>重载软件</span>
                        </div>
                        <div class="dropdown-item-item"></div>
                    </div>
                    <div class="dropdown-item">
                        <div class="dropdown-item-item">
                            <el-icon><QuestionFilled /></el-icon>
                        </div>
                        <div class="dropdown-item-item">
                            <span>帮助</span>
                        </div>
                        <div class="dropdown-item-item">
                            <el-icon class="arrow"><ArrowRight /></el-icon>
                        </div>
                        <div class="dropdown-more">
                            <div class="dropdown-item" @click="onSite">
                                <div class="dropdown-item-item">
                                    <el-icon><ChromeFilled /></el-icon>
                                </div>
                                <div class="dropdown-item-item">
                                    <span>官方网站</span>
                                </div>
                                <div class="dropdown-item-item"></div>
                            </div>
                            <div class="dropdown-item line"></div>
                            <div class="dropdown-item" @click="onAbout">
                                <div class="dropdown-item-item"></div>
                                <div class="dropdown-item-item">
                                    <span>关于</span>
                                </div>
                                <div class="dropdown-item-item"></div>
                            </div>
                        </div>
                    </div>
                    <div class="dropdown-item line"></div>
                    <div class="dropdown-item" @click="onQuit">
                        <div class="dropdown-item-item"></div>
                        <div class="dropdown-item-item">
                            <span>退出</span>
                        </div>
                        <div class="dropdown-item-item"></div>
                    </div>
                </div>
            </div>
            <div class="item device">
                <div class="new-device" @click="onNewDevice">
                    <el-text class="cnc" v-if="!props.cnc.device.message.status">
                        <el-icon><Connection /></el-icon>
                        <span>连接新设备</span>
                    </el-text>
                    <el-text class="cnc" v-else>
                        <el-icon><Connection /></el-icon>
                        <span>{{props.cnc.device.ip}}</span>
                        <el-icon style="margin-left: 5px"><Close /></el-icon>
                    </el-text>
                </div>
            </div>
        </div>
        <div class="header-item">
            <el-tooltip popper-class="cnc" effect="dark" content="运行" placement="bottom" v-if="props.cnc.device.message.status">
                <el-button class="cnc" :class="props.cnc.header.centre.start" :disabled="props.cnc.header.centre.start === 'disabled' || props.cnc.header.centre.start_disabled" :icon="icons.VideoPlay" @click="onControlStart(0)"></el-button>
            </el-tooltip>
            <el-tooltip popper-class="cnc" effect="dark" content="暂停" placement="bottom" v-if="props.cnc.device.message.status">
                <el-button class="cnc" :class="props.cnc.header.centre.pause" :disabled="props.cnc.header.centre.pause === 'disabled' || props.cnc.header.centre.pause_disabled" :icon="icons.VideoPause" @click="onControlPause"></el-button>
            </el-tooltip>
            <el-tooltip popper-class="cnc" effect="dark" content="停止" placement="bottom" v-if="props.cnc.device.message.status">
                <el-button class="cnc" :class="props.cnc.header.centre.stop" :disabled="props.cnc.header.centre.stop === 'disabled' || props.cnc.header.centre.stop_disabled" :icon="icons.Remove" @click="onControlStop"></el-button>
            </el-tooltip>
        </div>
        <div class="header-item">
            <div class="item global" v-if="props.cnc.device.message.status">
                <el-button class="cnc" :class="props.cnc.header.right.estop" :disabled="props.cnc.header.right.estop === 'disabled'" type="danger" :icon="icons.SwitchButton" @click="onEmergencyStop">急停</el-button>
            </div>
            <div class="item global" v-if="props.cnc.device.message.status">
                <el-button class="cnc" :class="props.cnc.header.right.enabled" :disabled="props.cnc.header.right.enabled === 'disabled'" type="primary" :icon="icons.Promotion" @click="onDeviceStart">启动</el-button>
            </div>
            <div class="item global" v-if="props.cnc.device.message.status">
                <el-button class="cnc" :class="props.cnc.header.right.limit" :disabled="props.cnc.header.right.limit === 'disabled' || props.cnc.device.machine.info.state === 2" type="warning" :icon="icons.DeleteLocation" @click="onDeviceOverrideLimits">忽略限位</el-button>
            </div>
        </div>
    </div>
    <NewDeviceDialog ref="newDeviceDialog" :cnc="props.cnc" v-if="props.cnc.dialog.config.type === 'device'" />
    <AboutDialog ref="aboutDialog" :cnc="props.cnc" v-if="props.cnc.dialog.config.type === 'about'" />
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted} from "vue";
import * as icons from "@element-plus/icons";
import {ElMessage, ElMessageBox} from "element-plus";
import NewDeviceDialog from "./dialog/device.vue";
import AboutDialog from "./dialog/about.vue";
export default defineComponent({
    name: "HeaderCommon",
    emits: [],
    props: ["cnc"],
    components: {
        NewDeviceDialog,
        AboutDialog
    },
    setup(props, context) {

        function onReload(){
            (window as any).runtime.WindowReloadApp();
        }

        function onSite(){
            (window as any).runtime.BrowserOpenURL("https://www.armcnc.net");
        }

        function onAbout(){
            props.cnc.dialog.config.type = "about";
            props.cnc.dialog.config.title = "关于";
            props.cnc.dialog.config.width = "300px";
            props.cnc.dialog.config.close = true;
            props.cnc.dialog.form = {}
            props.cnc.dialog.status = true;
        }

        function onQuit(){
            (window as any).runtime.Quit();
        }

        function onNewDevice(){
            if(!props.cnc.device.message.status){
                props.cnc.dialog.config.type = "device";
                props.cnc.dialog.config.title = "连接新设备";
                props.cnc.dialog.config.width = "400px";
                props.cnc.dialog.config.close = true;
                props.cnc.dialog.form = {
                    ip: "127.0.0.1",
                    loading: false
                }
                props.cnc.dialog.status = true;
            }else{
                ElMessageBox.confirm("是否确认断开设备连接？", "操作确认", {
                    draggable: true,
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning",
                    customClass: "cnc"
                }).then(() => {
                    (window as any).runtime.EventsEmit("event_message", {type: "disconnect_device"});
                }).catch(() => {});
            }
        }

        function onControlStart(line: any){
            if(props.cnc.device.machine.info){
                if ((props.cnc.device.machine.info.state == 2 && props.cnc.device.machine.info.paused != true) || props.cnc.device.machine.info.enabled != true) {
                    return;
                }
                if(!props.cnc.device.machine.info.user_data.is_homed){
                    return;
                }
                if(props.cnc.console.bottom.line.motion_line > 0 && props.cnc.header.centre.pause !== "active"){
                    if((window as any).simulation){
                        (window as any).simulation.clearToolLine();
                    }
                }
                let message = {command: "desktop:control:start", data: {line: line}}
                props.cnc.device.message.socket.send(JSON.stringify(message));
                (window as any).runtime.EventsEmit("set_start_line", {});
            }
        }

        function onControlPause(){
            if(props.cnc.device.machine.info){
                if (props.cnc.header.centre.pause === "active"){
                    onControlStart(0);
                }
                if ((props.cnc.device.machine.info.state == 2 && props.cnc.device.machine.info.paused == true) || props.cnc.device.machine.info.state != 2) {
                    return;
                }
                let message = {command: "desktop:control:pause", data: {}}
                props.cnc.device.message.socket.send(JSON.stringify(message));
            }
        }

        function onControlStop(){
            if(props.cnc.device.machine.info){
                if (props.cnc.device.machine.info.state == 2) {
                    let message = {command: "desktop:control:stop", data: {}}
                    props.cnc.device.message.socket.send(JSON.stringify(message));
                }
            }
        }

        function onEmergencyStop(){
            if(props.cnc.device.machine.info){
                let message = {command: "desktop:control:device:estop"}
                props.cnc.device.message.socket.send(JSON.stringify(message));
            }else{
                ElMessage.closeAll();
                ElMessage({
                    message: "设备未就绪，请稍等",
                    type: "warning",
                    customClass: "cnc"
                });
            }
        }

        function onDeviceStart(){
            if(props.cnc.device.machine.info){
                let message = {command: "desktop:control:device:start"}
                props.cnc.device.message.socket.send(JSON.stringify(message));
            }else{
                ElMessage.closeAll();
                ElMessage({
                    message: "设备未就绪，请稍等",
                    type: "warning",
                    customClass: "cnc"
                });
            }
        }

        function onDeviceOverrideLimits(){
            if(props.cnc.device.machine.info && props.cnc.device.machine.info.state !== 2){
                ElMessageBox.confirm("是否确认忽略限位？", "操作确认", {
                    draggable: true,
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning",
                    customClass: "cnc"
                }).then(() => {
                    let message = {command: "desktop:control:device:override_limits"}
                    props.cnc.device.message.socket.send(JSON.stringify(message));
                }).catch(() => {});
            }else{
                ElMessage.closeAll();
                ElMessage({
                    message: "设备未就绪，请稍等",
                    type: "warning",
                    customClass: "cnc"
                });
            }
        }

        onBeforeMount(() => {});

        onMounted(() => {});

        onBeforeUnmount(() => {});

        onUnmounted(() => {});

        return {
            props,
            icons,
            onReload,
            onSite,
            onAbout,
            onQuit,
            onNewDevice,
            onControlStart,
            onControlPause,
            onControlStop,
            onEmergencyStop,
            onDeviceStart,
            onDeviceOverrideLimits
        }
    }
});
</script>

<style scoped>
.header-main{
    width: 100%;
    height: 40px;
}
.header-main .header-item{
    width: 400px;
    height: 40px;
    display: inline-block;
    vertical-align: top;
}
.header-main .header-item:nth-child(2){
    width: calc(100% - 800px);
    text-align: center;
    padding: 5px 10px;
}
.header-main .header-item:last-child{
    width: 400px;
    text-align: center;
    padding: 0 10px;
}
.header-main .header-item .item{
    width: auto;
    height: 39px;
    display: inline-block;
    vertical-align: top;
}
.header-main .header-item .item.logo{
    width: 40px;
    background: url("/static/image/logo.png") no-repeat center center;
    background-size: 50%;
}
.header-main .header-item .item.menu{
    width: 40px;
    line-height: 36px;
    text-align: center;
    padding: 6px;
    position: relative;
}
.header-main .header-item .item.menu:hover{
    cursor: pointer;
    background-color: rgba(57, 59, 64, .5);
}
.header-main .header-item .item.menu .el-icon{
    font-size: 18px;
}
.header-main .header-item .item.menu .dropdown{
    width: max-content;
    white-space: nowrap;
    min-width: 120px;
    line-height: normal;
    position: absolute;
    top: 40px;
    left: 0;
    text-align: left;
    background-color: rgba(43, 45, 48, 1);
    border: 1px solid rgba(59, 60, 61, 1);
    z-index: 100;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
    padding: 5px;
    border-radius: 4px;
    color: #999999;
    display: none;
}
.header-main .header-item .item.menu:hover .dropdown{
    display: block;
}
.header-main .header-item .item.menu .dropdown .dropdown-item{
    width: 100%;
    height: 30px;
    position: relative;
}
.header-main .header-item .item.menu .dropdown .dropdown-item:hover{
    color: #ffffff;
}
.header-main .header-item .item.menu .dropdown .dropdown-item.line{
    height: 1px;
    border-bottom: 1px solid rgba(59, 60, 61, 1);
    margin: 6px 0;
}
.header-main .header-item .item.menu .dropdown .dropdown-item .dropdown-item-item{
    width: auto;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    vertical-align: top;
}
.header-main .header-item .item.menu .dropdown .dropdown-item .dropdown-item-item:first-child{
    width: 30px;
}
.header-main .header-item .item.menu .dropdown .dropdown-item .dropdown-item-item span{
    width: auto;
    min-width: 60px;
    height: 30px;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
}
.header-main .header-item .item.menu .dropdown .dropdown-item .dropdown-item-item .el-icon{
    width: 30px;
    height: 30px;
    font-size: 14px;
}
.header-main .header-item .item.menu .dropdown .dropdown-item .dropdown-item-item:last-child .el-icon{
    float: right;
}
.header-main .header-item .item.menu .dropdown .dropdown-item:not(:hover) .dropdown-item-item .el-icon.arrow{
    font-size: 12px;
    color: #666666;
}
.header-main .header-item .item.menu .dropdown .dropdown-item .dropdown-item-item i{
    color: #666666;
    padding-right: 5px;
}
.header-main .header-item .item.menu .dropdown .dropdown-item .dropdown-more{
    width: max-content;
    white-space: nowrap;
    min-width: 140px;
    line-height: normal;
    position: absolute;
    top: 0;
    left: calc(100%);
    text-align: left;
    background-color: rgba(43, 45, 48, 1);
    border: 1px solid rgba(59, 60, 61, 1);
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
    padding: 5px;
    border-radius: 4px;
    color: #999999;
    display: none;
}
.header-main .header-item .item.menu .dropdown .dropdown-item:hover .dropdown-more{
    display: block;
}
.header-main .header-item .item.device{
    padding: 0 5px;
    line-height: 34px;
}
.header-main .header-item .item.device .new-device{
    width: auto;
    height: 32px;
    line-height: 32px;
    background-color: rgba(30, 31, 34, .3);
    display: inline-block;
    vertical-align: middle;
    border-radius: 4px;
    padding: 0 10px;
}
.header-main .header-item .item.device .new-device:deep(.el-text){
    color: #999999;
}
.header-main .header-item .item.device .new-device:hover:deep(.el-text){
    cursor: pointer;
    color: #ffffff;
}
.header-main .header-item .item.global{
    width: auto;
    height: 39px;
    line-height: 30px;
    text-align: center;
    padding: 3px 10px;
    position: relative;
}
</style>
