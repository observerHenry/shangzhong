<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="width: 100%;height: 100%;padding: 24px">
        <!--<el-row>-->
            <!--<el-col :span="2">-->
                <!--<div style="margin: 10px;">-->
                    <!--<span style="font-weight: 600;color:#5D5D5D;font-size: 15px">学生列表</span >-->
                <!--</div>-->
            <!--</el-col >-->
            <!--<el-col :offset="16" :span="2">-->
                <!--<el-button-->
                        <!--icon="el-icon-download"-->
                        <!--size="normal"-->
                        <!--type="primary"-->
                        <!--style="text-align: right"-->
                        <!--@click="search">导入数据-->
                <!--</el-button>-->
            <!--</el-col>-->
            <!--<el-col :offset="1" :span="2">-->
                <!--<el-button-->
                        <!--icon="el-icon-upload2"-->
                        <!--size="normal"-->
                        <!--type="primary"-->
                        <!--style="text-align: right"-->
                        <!--@click="search">上传数据-->
                <!--</el-button>-->
            <!--</el-col>-->
        <!--</el-row>-->
        <el-row style="margin-top: 20px;background: white;min-height: 800px" class="well">
            <el-col :span="3" class="well" style="background: white;min-height: 750px;overflow-y: auto">
                <div style="text-align: center">
                    <el-button
                            icon="el-icon-plus"
                            size="normal"
                            type="primary"
                            style="text-align: right"
                            @click="handleAdd">学生
                    </el-button>
                    <el-tree :data="classArrays"
                             :props="defaultProps"
                             highlight-current
                             style="margin-top: 20px"
                             @node-click="handleNodeClick">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="20" style="background: white;margin-left: 30px;text-align: center">
                <el-row>
                    <!--<el-col :span="2">-->
                        <!--<el-button type="danger" icon="el-icon-delete"></el-button>-->
                    <!--</el-col>-->
                    <el-col :span="7" :offset="14">
                        <el-input v-model="queryKey" placeholder="根据学号、姓名、站点、校车编号模糊查询" clearable></el-input>
                    </el-col>
                    <el-col :span="2" style="margin-left: 10px">
                        <el-button type="primary" icon="el-icon-search" @click="fetchStudents">搜索</el-button>
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
                            label="序号"
                            align="center">
                        <template scope="scope">
                            {{scope.$index+startRow}}
                        </template>
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
                            <img style=" height: 50px;width:50px; border: solid 2px lightskyblue; border-radius: 50%;align-items: center;justify-content: center;
                                    overflow: hidden;" :src="getPhoto(scope.row.headImg)"/>
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
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="totalRecords">
                </el-pagination>
            </el-col>
        </el-row>
        <el-dialog :visible.sync="modifyDialogVisible" width="65%">
            <el-row>
                <el-col :span="4">
                    <el-menu :default-active="activeIndex" style="min-height: 400px" @select="handleStuSelect">
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

                <el-col :span="19" :offset="1">
                    <div v-show="activeIndex == '1'">
                        <h4>基本信息</h4>
                        <el-row>
                            <el-col :span="2">
                                <img style=" height: 60px;width:60px; border: solid 2px lightskyblue; border-radius: 50%;align-items: center;justify-content: center;
                                    overflow: hidden; margin-top: 10px" :src="modifyPhoto(modifyForm.headImg)"/>
                            </el-col>
                            <el-col :span="6">
                                <el-upload
                                        action=""
                                        :limit="1"
                                        :multiple="false"
                                        :file-list="fileList"
                                        :show-file-list="true"
                                        accept=".png,.jpg"
                                        :on-change="handlePhotoChange"
                                        :on-remove="handleRemove"
                                        :on-exceed="handleExceed"
                                        :auto-upload="false"
                                        style="margin-top: 25px;margin-left: 20px">
                                    <el-button size="mini" type="primary" plain>更换</el-button>
                                    <div slot="tip" class="el-upload__tip">仅限于PNG/JPG文件，且不超过2M</div>
                                </el-upload>
                            </el-col>
                        </el-row>
                        <el-form :model="modifyForm" label-position="top">
                            <el-row style="margin-top: 10px">
                                <el-col :span="5">
                                    <el-form-item label="学号：">
                                        <el-input v-model="modifyForm.studentNumber"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" :offset="1">
                                    <el-form-item label="姓名：">
                                        <el-input v-model="modifyForm.name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" :offset="1">
                                    <el-form-item label="班级：">
                                        <el-select v-model="modifyForm.banji" clearable>
                                            <el-option
                                                    v-for="item in allClasses"
                                                    v-bind:value="item.id"
                                                    v-bind:label="item.className">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row style="margin-top: 10px">
                                <el-col :span="5">
                                    <el-form-item label="所属校车：">
                                        <el-select v-model="modifyForm.busNumber" @change="onBusChange" clearable filterable>
                                            <el-option
                                                    v-for="item in busList"
                                                    v-bind:value="item.number"
                                                    v-bind:label="item.number">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" :offset="1">
                                    <el-form-item label="早班接送点：">
                                        <el-select v-model="modifyForm.boardStationMorning" clearable>
                                            <el-option
                                                    v-for="item in busStations"
                                                    v-bind:value="item.id"
                                                    v-bind:label="item.stationName">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" :offset="1">
                                    <el-form-item label="午班下车点：">
                                        <el-select v-model="modifyForm.boardStationAfternoon" clearable>
                                            <el-option
                                                    v-for="item in busStations"
                                                    v-bind:value="item.id"
                                                    v-bind:label="item.stationName">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <el-row style="margin-top: 20px">
                            <el-col :span="7" :offset="17">
                                <el-button @click="modifyDialogVisible = false" icon="el-icon-close" type="danger">取 消</el-button>
                                <el-button type="primary" @click="onEdit" icon="el-icon-check">保存</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </el-dialog>
        <el-dialog :visible.sync="addDialogVisible" width="65%">
            <el-row>
                <el-col :span="22" :offset="1">
                    <h4>基本信息</h4>
                    <el-row>
                        <el-col :span="2">
                            <img style=" height: 60px;width:60px; border: solid 2px lightskyblue; border-radius: 50%;align-items: center;justify-content: center;
                                overflow: hidden; margin-top: 10px" :src="modifyPhoto(form.headImg)" v-show="form.headImg != '' || photoData != null"/>
                        </el-col>
                        <el-col :span="6">
                            <el-upload
                                    action=""
                                    :limit="1"
                                    :multiple="false"
                                    :file-list="fileList"
                                    :show-file-list="true"
                                    accept=".png,.jpg"
                                    :on-change="handlePhotoChange"
                                    :on-remove="handleRemove"
                                    :on-exceed="handleExceed"
                                    :auto-upload="false"
                                    style="margin-top: 25px;margin-left: 20px">
                                <el-button size="mini" type="primary" plain>上传</el-button>
                                <div slot="tip" class="el-upload__tip">仅限于PNG/JPG文件，且不超过2M</div>
                            </el-upload>
                        </el-col>
                    </el-row>
                    <el-form :model="form" label-position="top">
                        <el-row style="margin-top: 10px">
                            <el-col :span="5">
                                <el-form-item label="学号：">
                                    <el-input v-model="form.studentNumber"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" :offset="1">
                                <el-form-item label="姓名：">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" :offset="1">
                                <el-form-item label="班级：">
                                    <el-select v-model="form.banji" clearable>
                                        <el-option
                                                v-for="item in allClasses"
                                                v-bind:value="item.id"
                                                v-bind:label="item.className">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 10px">
                            <el-col :span="5">
                                <el-form-item label="所属校车：">
                                    <el-select v-model="form.busNumber" @change="onAddBusChange" clearable filterable>
                                        <el-option
                                                v-for="item in busList"
                                                v-bind:value="item.number"
                                                v-bind:label="item.number">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" :offset="1">
                                <el-form-item label="早班接送点：">
                                    <el-select v-model="form.boardStationMorning" clearable>
                                        <el-option
                                                v-for="item in busStations"
                                                v-bind:value="item.id"
                                                v-bind:label="item.stationName">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" :offset="1">
                                <el-form-item label="午班下车点：">
                                    <el-select v-model="form.boardStationAfternoon" clearable>
                                        <el-option
                                                v-for="item in busStations"
                                                v-bind:value="item.id"
                                                v-bind:label="item.stationName">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-row style="margin-top: 20px">
                        <el-col :span="7" :offset="17">
                            <el-button @click="addDialogVisible = false" icon="el-icon-close" type="danger">取 消</el-button>
                            <el-button type="primary" @click="onAdd" icon="el-icon-check">提 交</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="deleteConfirmVisible"  width="30%">
            <span >确认要删除学生[ <b >{{deleteItem.name}}</b > ]吗？</span >
            <span slot="footer" class="dialog-footer" >
                <el-button @click="deleteConfirmVisible = false" icon="el-icon-close" >取 消</el-button >
                <el-button type="primary" @click="onConfirmDelete" icon="el-icon-check">确 定</el-button >
            </span >
        </el-dialog >
    </div>

</template>

<script>
    var _this;
    import request from '../../api/request'
    var image = require("../../assets/img/ldh.png");

    export default {
        name: "StudentMange",
        components: {},
        data() {
            _this = this;
            return {	    //分页
                pageSize: EveryPageNum,//每一页的num
                currentPage: 1,
                startRow: 1,
                tableData: [],
                totalRecords:0,
                currentGrade:"",
                queryKey: "",
                classArrays: [],
                loadingUI:false,
                allClasses: [
                ],
                busList: [],
                defaultProps: {
                    children: 'classes',
                    label: 'label'
                },
                modifyForm: {},
                form: {
                    headImg:"",
                    studentNumber:"",
                    name:"",
                    banji:"",
                    busNumber:"",
                    boardStationMorning:"",
                    boardStationAfternoon:""
                },
                modifyDialogVisible: false,
                addDialogVisible:false,
                deleteConfirmVisible:false,
                activeIndex: "1",
                busStations:[],
                allBusStations:[],
                allBusLine:[],
                currentStudent:{},
                fileList:[],
                photoData:"",
                deleteItem:""
            }
        },
        methods: {
            handleDelete(index, item) {
                _this.deleteConfirmVisible = true;
                _this.deleteItem = item;
            },
            onConfirmDelete() {
                let params = new URLSearchParams();
                params.append("student", JSON.stringify(_this.deleteItem));
                request({
                    url: '/student/delete',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.tableData.splice(_this.tableData.indexOf(_this.item),1);
                        _this.deleteConfirmVisible = false;
                        showMessage(_this,"删除学生数据成功！",1);
                    } else {
                        showMessage(_this,"删除学生数据失败！");
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            handlePhotoChange(file, fileList) {
                var reader = new FileReader();
                if(file.size > PHOTO_SIZE_LIMIT) {
                    showMessage(_this, "文件大小超过2M");
                } else {
                    reader.readAsDataURL(file.raw);
                    reader.onload = function(e){
                        // 这个就是base64编码了
                        _this.photoData = this.result;
                    }
                }
            },
            handleRemove(file, fileList) {
                _this.fileList = [];
                _this.photoData = "";
            },
            handleExceed(file, fileList) {
                showMessage(_this, "请先删除已选择文件!");
            },
            onBusChange(newBusNumber) {
                _this.modifyForm.boardStationMorning = "";
                _this.modifyForm.boardStationAfternoon = "";
                _this.modifyForm.busNumber = newBusNumber;
                _this.fetchBusLine(newBusNumber);
            },
            onAddBusChange(newBusNumber) {
                _this.form.boardStationMorning = "";
                _this.form.boardStationAfternoon = "";
                _this.form.busNumber = newBusNumber;
                _this.fetchBusLine(newBusNumber);
            },
            handleStuSelect(index) {
                _this.activeIndex = index;
            },
            handleSizeChange(val) {

            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.fetchStudents();
            },
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
                                    label: res.data.data.list[i].grade,
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
                                        label: res.data.data.list[i].grade,
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

                }).catch(error => {
                    console.log(error)
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
                }).catch(error => {
                    console.log(error)
                })
            },
            handleNodeClick(data) {
                _this.currentGrade = data;
                _this.currentPage = 1;
                _this.startRow = 1;
                _this.fetchStudents();
            },
            getPhoto(img) {
                if(img == null || img == '') {
                    return require("../../assets/img/avator.png")
                }
                return encodeURI(STUDENT_IMG_BASE + img);
            },
            modifyPhoto(img) {
                if(_this.photoData !== "") {
                    return _this.photoData;
                } else {
                    return encodeURI(STUDENT_IMG_BASE + img);
                }
            },
            fetchStudents() {
                // if(!isUndefined(_this.currentGrade.id)) {
                let params = new URLSearchParams();
                if(isUndefined(_this.currentGrade.label)) {
                    params.append("gradeName","");
                    params.append("className","");
                } else {
                    if(_this.currentGrade.label.indexOf("年级") != -1) {
                        params.append("gradeName",_this.currentGrade.label);
                    } else {
                        params.append("className",_this.currentGrade.label);
                    }
                }
                params.append("page", _this.currentPage);
                params.append("size", _this.pageSize);
                params.append("queryKey", _this.queryKey);
                request({
                    url: '/student/getStudents',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.totalRecords = res.data.data.total;
                        _this.tableData = res.data.data.list;
                        _this.startRow = res.data.data.startRow;
                    } else {
                        showMessage(_this,"获取数据失败！");
                    }
                    _this.loadingUI = false;

                }).catch(error => {
                    console.log(error)
                    _this.loadingUI = false;

                })
                // }
            },
            fetchBusLine(busNumber) {
                let params = new URLSearchParams();
                params.append("busNumber",busNumber);
                request({
                    url: '/bus/line/getBusLineByBusNumber',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.allBusLine = res.data.data.list;
                        if(res.data.data.list.length > 0) {
                            _this.busStations = [];
                            let tmpList = res.data.data.list[0].stations.split(",");
                            _this.busStations = _this.allBusStations.filter(function (item) {
                                return tmpList.indexOf(item.stationName) !== -1;
                            });
                        }
                    } else {
                        showMessage(_this,"获取线路数据失败！");
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            fetchStations() {
                let params = new URLSearchParams();
                request({
                    url: '/bus/stations/search',
                    method: 'post',
                    data: params
                }).then(res => {
                    if (res.data.code == 200) {
                        _this.allBusStations = res.data.data.list;
                    } else {
                        showMessage(_this,"获取站点数据失败！");
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            handleEdit(index, data) {
                _this.photoData = "";
                _this.currentStudent = data;
                _this.modifyForm = copyObjectByJSON(data);
                _this.modifyDialogVisible = true;
                _this.activeIndex = "1";
                _this.fileList = [];
                _this.fetchBusLine(_this.modifyForm.busNumber);
            },
            onEdit() {
                 if(_this.verifyForm(_this.modifyForm)){
                    let params = new URLSearchParams();
                    params.append("student",JSON.stringify(_this.modifyForm));
                    params.append("photoData",_this.photoData);
                    request({
                        url: '/student/update',
                        method: 'post',
                        data: params
                    }).then(res => {
                        if (res.data.code == 200) {
                            _this.modifyDialogVisible = false;
                            _this.fetchStudents();
                            showMessage(_this, "保存学生信息成功",1);
                        } else {
                            showMessage(_this, "保存学生信息失败");
                        }
                    }).catch(error => {
                        console.log(error)
                    })
                }
            },
            handleAdd(){
                _this.photoData = "";
                _this.addDialogVisible = true;
                _this.fileList = [];
            },
            onAdd() {
                if(_this.verifyForm(_this.form)){
                    let params = new URLSearchParams();
                    let paramObj  = copyObjectByJSON(_this.form);
                    paramObj.busLineMorning = _this.filterBusLineByBus("早班");
                    paramObj.busLineAfternoon = _this.filterBusLineByBus("午班");
                    params.append("student",JSON.stringify(paramObj));
                    params.append("photoData",_this.photoData);
                    request({
                        url: '/student/add',
                        method: 'post',
                        data: params
                    }).then(res => {
                        if (res.data.code == 200) {
                            _this.addDialogVisible = false;
                            _this.fetchStudents();
                            showMessage(_this, "添加学生信息成功",1);
                        } else {
                            showMessage(_this, "添加学生信息失败");
                        }
                    }).catch(error => {
                        console.log(error)
                    })
                }
            },
            verifyForm(formObj) {
                let result = true;
                if(formObj.studentNumber == null || formObj.studentNumber == "") {
                    showMessage(_this,"学号不能为空！");
                    result = false;
                } else if(formObj.name == null || formObj.name == "") {
                    showMessage(_this,"姓名不能为空！");
                    result = false;
                } else if(formObj.banji == null || formObj.banji == "") {
                    showMessage(_this,"班级不能为空！");
                    result = false;
                } else if(formObj.busNumber == null || formObj.busNumber == "") {
                    showMessage(_this,"校车不能为空！");
                    result = false;
                } else if(formObj.boardStationMorning == null
                    || formObj.boardStationMorning == ""
                    || formObj.boardStationMorning == 0) {
                    showMessage(_this,"早班站点不能为空！");
                    result = false;
                } else if(formObj.boardStationAfternoon == null
                    || formObj.boardStationAfternoon == ""
                    || formObj.boardStationAfternoon == 0) {
                    showMessage(_this,"午班站点不能为空！");
                    result = false;
                } else if(formObj.boardStationAfternoon != formObj.boardStationMorning) {
                    showMessage(_this,"早班站点和午班站点不一致！");
                    result = false;
                }
                return result;
            },
            filterBusLineByBus(mode) {
                let result = "";
                for (let i = 0; i < _this.allBusLine.length; i++) {
                    if(mode === _this.allBusLine[i].mode) {
                        result = _this.allBusLine[i].id;
                        break;
                    }
                }
                return result;
            }
        },
        computed: {},

        filters: {},

        created: function () {


        },
        mounted: function () {
            _this.getClasses();
            _this.getBusList();
            _this.fetchStations();
            _this.fetchStudents();
        }
    }
</script>
<style>
    input[type=file] {
        display: none;
    }

</style>
