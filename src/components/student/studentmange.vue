<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="width: 100%;height: 100%;padding: 24px">
        <el-row>
            <el-col :span="2" style="margin-top: 10px">
                <h4>学生列表</h4>
            </el-col>
            <el-col :offset="16" :span="2">
                <el-button
                        icon="el-icon-download"
                        size="normal"
                        type="primary"
                        style="text-align: right"
                        @click="search">导入数据
                </el-button>
            </el-col>
            <el-col :offset="1" :span="2">
                <el-button
                        icon="el-icon-upload2"
                        size="normal"
                        type="primary"
                        style="text-align: right"
                        @click="search">上传数据
                </el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px;background: white" class="well">
            <el-col :span="4" class="well" style="background: white">
                <div style="text-align: center">
                    <el-button
                            icon="el-icon-plus"
                            size="normal"
                            type="primary"
                            style="text-align: right"
                            @click="addStudent">添加学生
                    </el-button>
                    <el-tree :data="classArrays"
                             :props="defaultProps"
                             highlight-current
                             style="margin-top: 20px"
                             @node-click="handleNodeClick"></el-tree>
                </div>
            </el-col>
            <el-col :span="19" style="background: white;margin-left: 30px;text-align: center">
                <el-row>
                    <el-col :span="2">
                        <el-button type="danger" icon="el-icon-delete" circle></el-button>
                    </el-col>
                    <el-col :span="8" :offset="10">
                        <el-input v-model="searchContent" placeholder="请输入关键词"></el-input>
                    </el-col>
                    <el-col :span="2" style="margin-left: 10px">
                        <el-button type="primary" icon="el-icon-search">搜索</el-button>
                    </el-col>
                </el-row>
                <el-table
                        v-loading="loadingUI"
                        element-loading-text="获取数据中..."
                        :data="tableData"
                        border
                        highlight-current-row
                        empty-text="暂无数据..."
                        show-overflow-tooltip="true"
                        style="width: 100%; margin-top: 10px">
                    <el-table-column
                            width="75"
                            align="center"
                            type="selection">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            prop="studentNumber"
                            sortable
                            label="学号">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="headImg"
                            width="100"
                            label="头像">
                        <template scope="scope">
                            <img style=" height: 60px;width:60px; border: solid 2px lightskyblue; border-radius: 50%;align-items: center;justify-content: center;
                                    overflow: hidden;" :src="scope.row.photo"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="姓名"
                                     align="center"
                                     sortable
                                     prop="name">
                        <template scope="scope">
                            <div>
                                {{scope.row.name}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="banjiName"
                            label="班级">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="busNumber"
                            label="校车">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            width="200"
                            label="站点">
                        <template scope="scope">
                            <div>
                                {{scope.row.boardStationAfternoonName}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作"
                            width="150">
                        <template scope="scope">
                            <el-button
                                    size="small"
                                    icon="el-icon-edit"
                                    type="primary"
                                    @click="handleEdit(scope.$index, scope.row)">
                            </el-button>
                            <el-button
                                    size="small"
                                    type="danger"
                                    icon="el-icon-delete"
                                    @click="handleDelete(scope.$index, scope.row)">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        style="margin-top: 20px"
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage3"
                        :page-size="8"
                        layout="prev, pager, next, jumper"
                        :total="88">
                </el-pagination>
            </el-col>
        </el-row>
        <el-dialog :visible.sync="modifyDialogVisible" width="60%">
            <el-row>
                <el-col :span="5">
                    <el-menu :default-active="activeIndex">
                        <el-menu-item index="1">
                            <i class="el-icon-document"></i>
                            <span slot="title">基本信息</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-service"></i>
                            <span slot="title">关联人员</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-setting"></i>
                            <span slot="title">预约变更</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>

                <el-col :span="18" :offset="1">
                    <div v-show="activeIndex == '1'">
                        <h4>基本信息</h4>
                        <img style=" height: 60px;width:60px; border: solid 2px lightskyblue; border-radius: 50%;align-items: center;justify-content: center;
                                    overflow: hidden; margin-top: 20px" :src="getPhoto()"/>
                        <el-form :model="modifyForm">
                            <el-row style="margin-top: 20px">
                                <el-col :span="7">
                                    <el-form-item label="学号：">
                                        <el-input v-model="modifyForm.studentNumber" @change="onChange"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" :offset="1">
                                    <el-form-item label="姓名：">
                                        <el-input v-model="modifyForm.name" @change="onChange"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" :offset="1">
                                    <el-form-item label="班级：">
                                        <el-select v-model="modifyForm.banji" @change="onChange" clearable>
                                            <el-option
                                                    v-for="item in allClasses"
                                                    v-bind:value="item.id"
                                                    v-bind:label="item.className">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row style="margin-top: 20px">
                                <el-col :span="7">
                                    <el-form-item label="所属校车：">
                                        <el-select v-model="modifyForm.busNumber" @change="onChange" clearable>
                                            <el-option
                                                    v-for="item in busList"
                                                    v-bind:value="item.number"
                                                    v-bind:label="item.number">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" :offset="1">
                                    <el-form-item label="早班接送点：">
                                        <el-select v-model="modifyForm.boardStationMorning" @change="onChange" clearable>
                                            <el-option
                                                    v-for="item in busLineMorning"
                                                    v-bind:value="item"
                                                    v-bind:label="item">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" :offset="1">
                                    <el-form-item label="午班下车点：">
                                        <el-select v-model="modifyForm.boardStationAfternoon" @change="onChange" clearable>
                                            <el-option
                                                    v-for="item in busLineAfternoon"
                                                    v-bind:value="JSON.parse(item)"
                                                    v-bind:label="JSON.parse(item)">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
            <el-alert v-if="isError" style="margin-top: 10px;padding: 5px;"
                      :title="errorMsg"
                      type="error"
                      :closable="false"
                      show-icon>
            </el-alert>
            <div slot="footer" class="dialog-footer" style="margin-bottom: 20px;margin-right: 40px">
                <el-button @click="modifyDialogVisible = false" icon="el-icon-close" type="danger">取 消</el-button>
                <el-button type="primary" @click="onEidt" icon="el-icon-check">保存修改</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    var _this;
    import request from '../../api/request'

    export default {
        name: "StudentMange",
        components: {},
        data() {
            _this = this;
            return {
                tableData: [
                    // {
                    //     id: "320001",
                    //     photo: _this.getPhoto(),
                    //     name: "刘德华",
                    //     class: "3年级1班",
                    //     bus: "1号校车",
                    //     busStation: "西藏北路柳营路/西藏北路苏北路"
                    // }
                ],
                searchContent: "",
                classArrays: [
                    // {
                    //     grade_id:1,
                    //     label: '1年级',
                    //     classes: [{
                    //         id: 1,
                    //         label: '1年级1班'
                    //     }, {
                    //         id: 2,
                    //         label: '1年级2班'
                    //     }, {
                    //         id: 3,
                    //         label: '1年级3班'
                    //     }]
                    // }
                ],
                allClasses: [
                ],
                allBusList: [],
                defaultProps: {
                    children: 'classes',
                    label: 'label'
                },
                modifyForm: {},
                modifyDialogVisible: false,
                activeIndex: "1",
                busLineMorning:[],
                busLineAfternoon:[],
                allBusLine:[]
            }
        },
        methods: {
            getClasses() {
                let params = new URLSearchParams();
                request({
                    url: 'banji/list',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.classArrays = [];
                        _this.allClasses = res.data.data.list;
                        for (let i = 0; i < res.data.data.list.length; i++) {
                            if(_this.classArrays.length == 0 ) {
                                let data = {
                                    grade_id:res.data.data.list[i].grade,
                                    label: res.data.data.list[i].grade + "年级",
                                    classes: []
                                }
                                data.classes.push({
                                    id:res.data.data.list[i].id,
                                    label:res.data.data.list[i].className
                                })
                                _this.classArrays.push(data);
                            } else {
                                let gradeFound = false;
                                for (let j = 0; j < _this.classArrays.length; j++) {
                                    if(_this.classArrays[j].grade_id == res.data.data.list[i].grade) {
                                        _this.classArrays[j].classes.push({
                                            id:res.data.data.list[i].id,
                                            label:res.data.data.list[i].className
                                        })
                                        gradeFound = true;
                                    }
                                }
                                if(!gradeFound) {
                                    let data = {
                                        grade_id:res.data.data.list[i].grade,
                                        label: res.data.data.list[i].grade + "年级",
                                        classes: []
                                    }
                                    data.classes.push({
                                        id:res.data.data.list[i].id,
                                        label:res.data.data.list[i].className
                                    })
                                    _this.classArrays.push(data);
                                }
                            }

                        }
                    } else {
                        showMessage(_this,"获取数据失败！");
                    }
                    _this.multipleSelection = [];
                    _this.loadingUI = false;

                }).catch(error => {
                    console.log(error)
                    _this.loadingUI = false;

                })
            },
            getBusList() {
                let params = new URLSearchParams();
                request({
                    url: '/bus/base/info/list',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.busList = res.data.data.list;
                    } else {
                        showMessage(_this,"获取数据失败！");
                    }
                    _this.loadingUI = false;

                }).catch(error => {
                    console.log(error)
                    _this.loadingUI = false;

                })
            },
            handleNodeClick(data) {
                //只监听班级的点击
                if(!isUndefined(data.id)) {
                    let params = new URLSearchParams();
                    params.append("className",data.label);
                    request({
                        url: '/student/getStudents',
                        method: 'post',
                        data: params
                    }).then(res => {
                        if (res.data.code == 200) {
                            _this.tableData = res.data.data.list;
                        } else {
                            showMessage(_this,"获取数据失败！");
                        }
                        _this.loadingUI = false;

                    }).catch(error => {
                        console.log(error)
                        _this.loadingUI = false;

                    })
                }
            },
            getPhoto() {
                return require("../../assets/img/ldh.png");
            },
            addStudent() {

            },
            getTransportRangeMorning(busNumber) {
                let params = new URLSearchParams();
                params.append("busNumber", busNumber);
                params.append("busMode", "早班");
                request({
                    url: '/transport/range/getTransportRangeByBusNumberAndBusMode',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.busLineMorning = JSON.parse(res.data.data.list[0].stations);
                    } else {
                        showMessage(_this,"获取数据失败！");
                    }
                    _this.loadingUI = false;

                }).catch(error => {
                    console.log(error)
                    _this.loadingUI = false;

                })
            },

            getTransportRangeAfternoon(busNumber) {
                let params = new URLSearchParams();
                params.append("busNumber", busNumber);
                params.append("busMode", "午班");
                request({
                    url: '/transport/range/getTransportRangeByBusNumberAndBusMode',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.busLineAfternoon = JSON.parse(res.data.data.list[0].stations);
                    } else {
                        showMessage(_this,"获取数据失败！");
                    }
                    _this.loadingUI = false;

                }).catch(error => {
                    console.log(error)
                    _this.loadingUI = false;

                })
            },

            handleEdit(index, data) {
                _this.modifyForm = data;
                _this.modifyDialogVisible = true;
                _this.getTransportRangeMorning(data.busNumber);
                _this.getTransportRangeAfternoon(data.busNumber);
            },

        },
        computed: {},

        filters: {},

        created: function () {


        },
        mounted: function () {
            _this.getClasses();
            _this.getBusList();
        }
    }
</script>
<style>

</style>
