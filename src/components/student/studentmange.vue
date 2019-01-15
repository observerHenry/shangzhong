<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="margin: 50px">
        <el-row>
            <el-col :span="2" style="margin-top: 10px">
                <h4>学生列表</h4 >
            </el-col >
            <el-col :offset="16" :span="2">
                <el-button
                        icon="el-icon-download"
                        size="normal"
                        type="primary"
                        style="text-align: right"
                        @click="search" >导入数据
                </el-button >
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
        </el-row >
        <el-row style="margin-top: 20px;background: white" class="well" >
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
                        <el-input v-model="searchContent" placeholder="请输入关键词" ></el-input>
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
                        style="width: 100%; margin-top: 10px" >
                    <el-table-column
                            width="75"
                            align="center"
                            type="selection">
                    </el-table-column >

                    <el-table-column
                            align="center"
                            prop="nameplate"
                            sortable
                            label="学号" >
                        <template scope="scope" >
                            <div >
                                {{scope.row.id}}
                            </div >
                        </template >
                    </el-table-column >
                    <el-table-column
                            align="center"
                            prop="photo"
                            width="100"
                            label="头像" >
                        <template scope="scope" >
                            <img  style=" height: 60px;width:60px; border: solid 2px lightskyblue; border-radius: 50%;align-items: center;justify-content: center;
                                    overflow: hidden;" :src="scope.row.photo"/>
                        </template >
                    </el-table-column >
                    <el-table-column label="姓名"
                                     align="center"
                                     sortable
                                     prop="name" >
                        <template scope="scope" >
                            <div >
                                {{scope.row.name}}
                            </div >
                        </template >
                    </el-table-column >
                    <el-table-column
                            align="center"
                            prop="class"
                            label="班级" >
                    </el-table-column >
                    <el-table-column
                            align="center"
                            prop="bus"
                            label="校车" >
                    </el-table-column >
                    <el-table-column
                            align="center"
                            width="200"
                            label="站点" >
                        <template scope="scope" >
                            <div >
                                {{scope.row.busStation}}
                            </div >
                        </template >
                    </el-table-column >
                    <el-table-column
                            align="center"
                            label="操作"
                            width="150" >
                        <template scope="scope" >
                            <el-button
                                    size="small"
                                    icon="el-icon-edit"
                                    type="primary"
                                    @click="handleEdit(scope.$index, scope.row)" >
                            </el-button >
                            <el-button
                                    size="small"
                                    type="danger"
                                    icon="el-icon-delete"
                                    @click="handleDelete(scope.$index, scope.row)" >
                            </el-button >
                        </template >
                    </el-table-column >
                </el-table >
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
        <el-dialog :visible.sync="modifyDialogVisible" width="70%">
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
                        <el-form :model="modifyForm" >
                            <el-row style="margin-top: 20px">
                                <el-col :span="7" >
                                    <el-form-item label="学号：" >
                                        <el-input v-model="modifyForm.id" @change="onChange" ></el-input >
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" :offset="1" >
                                    <el-form-item label="姓名：">
                                        <el-input v-model="modifyForm.name" @change="onChange" ></el-input >
                                    </el-form-item >
                                </el-col >
                                <el-col :span="7" :offset="1" >
                                    <el-form-item label="班级：" >
                                        <el-select v-model="modifyForm.class" @change="onChange" clearable>
                                            <el-option
                                                    v-for="item in allClasses"
                                                    v-bind:value="item.id"
                                                    v-bind:label="item.className" >
                                            </el-option >
                                        </el-select >
                                    </el-form-item >
                                </el-col >
                            </el-row>
                            <el-row style="margin-top: 20px">
                                <el-col :span="7">
                                    <el-form-item label="所属校车：" >
                                        <el-select v-model="modifyForm.class" @change="onChange" clearable>
                                            <el-option
                                                    v-for="item in allClasses"
                                                    v-bind:value="item.id"
                                                    v-bind:label="item.className" >
                                            </el-option >
                                        </el-select >
                                    </el-form-item >
                                </el-col >
                                <el-col :span="7" :offset="1">
                                    <el-form-item label="早班接送点：" >
                                        <el-select v-model="modifyForm.class" @change="onChange" clearable>
                                            <el-option
                                                    v-for="item in allClasses"
                                                    v-bind:value="item.id"
                                                    v-bind:label="item.className" >
                                            </el-option >
                                        </el-select >
                                    </el-form-item >
                                </el-col >
                                <el-col :span="7" :offset="1">
                                    <el-form-item label="午班下车点：" >
                                        <el-select v-model="modifyForm.class" @change="onChange" clearable>
                                            <el-option
                                                    v-for="item in allClasses"
                                                    v-bind:value="item.id"
                                                    v-bind:label="item.className" >
                                            </el-option >
                                        </el-select >
                                    </el-form-item >
                                </el-col >

                            </el-row>
                        </el-form >
                    </div>
                </el-col>
            </el-row>
            <el-alert v-if="isError" style="margin-top: 10px;padding: 5px;"
                      :title="errorMsg"
                      type="error"
                      :closable="false"
                      show-icon >
            </el-alert >
            <div slot="footer" class="dialog-footer" style="margin-bottom: 20px;margin-right: 40px" >
                <el-button @click="modifyDialogVisible = false" icon="el-icon-close" type="danger">取 消</el-button >
                <el-button type="primary" @click="onEidt" icon="el-icon-check">保存修改</el-button >
            </div >
        </el-dialog >
    </div>

</template>

<script>
    var _this;
    export default {
        name: "StudentMange",
        components: {},
        data () {
            _this = this;
            return {
                tableData: [
                    {
                        id:"320001",
                        photo:_this.getPhoto(),
                        name:"刘德华",
                        class:"3年级1班",
                        bus:"1号校车",
                        busStation:"西藏北路柳营路/西藏北路苏北路"
                    },
                    {
                        id:"320002",
                        photo:_this.getPhoto(),
                        name:"刘德华",
                        class:"3年级1班",
                        bus:"1号校车",
                        busStation:"西藏北路柳营路/西藏北路苏北路"
                    },
                    {
                        id:"320003",
                        photo:_this.getPhoto(),
                        name:"刘德华",
                        class:"3年级1班",
                        bus:"1号校车",
                        busStation:"西藏北路柳营路/西藏北路苏北路"
                    },
                    {
                        id:"320004",
                        photo:_this.getPhoto(),
                        name:"刘德华",
                        class:"3年级1班",
                        bus:"1号校车",
                        busStation:"西藏北路柳营路/西藏北路苏北路"
                    },
                    {
                        id:"320005",
                        photo:_this.getPhoto(),
                        name:"刘德华",
                        class:"3年级1班",
                        bus:"1号校车",
                        busStation:"西藏北路柳营路/西藏北路苏北路"
                    },
                    {
                        id:"320006",
                        photo:_this.getPhoto(),
                        name:"刘德华",
                        class:"3年级1班",
                        bus:"1号校车",
                        busStation:"西藏北路柳营路/西藏北路苏北路"
                    },
                    {
                        id:"320007",
                        photo:_this.getPhoto(),
                        name:"刘德华",
                        class:"3年级1班",
                        bus:"1号校车",
                        busStation:"西藏北路柳营路/西藏北路苏北路"
                    }
                ],
                searchContent:"",
                classArrays:[{
                    label: '1年级',
                    children: [{
                        label: '1年级1班'
                    },{
                        label: '1年级2班'
                    },{
                        label: '1年级3班'
                    }]
                }, {
                    label: '2年级',
                    children: [{
                        label: '2年级1班'
                    },{
                        label: '2年级2班'
                    },{
                        label: '2年级3班'
                    }]
                },{
                    label: '3年级',
                    children: [{
                        label: '3年级1班'
                    },{
                        label: '3年级2班'
                    },{
                        label: '3年级3班'
                    }]
                },{
                    label: '4年级',
                    children: [{
                        label: '4年级1班'
                    },{
                        label: '4年级2班'
                    },{
                        label: '4年级3班'
                    }]
                }, {
                    label: '5年级',
                    children: [{
                        label: '5年级1班'
                    },{
                        label: '5年级2班'
                    },{
                        label: '5年级3班'
                    }]
                },{
                    label: '6年级',
                    children: [{
                        label: '6年级1班'
                    },{
                        label: '6年级2班'
                    },{
                        label: '6年级3班'
                    }]
                }],
                allClasses : [
                    {
                        id:1,
                        className:"1年级1班"
                    },
                    {
                        id:2,
                        className:"1年级2班"
                    },
                    {
                        id:3,
                        className:"1年级3班"
                    },
                    {
                        id:4,
                        className:"2年级1班"
                    },
                    {
                        id:5,
                        className:"2年级2班"
                    },
                    {
                        id:6,
                        className:"2年级3班"
                    },
                    {
                        id:7,
                        className:"3年级1班"
                    },
                    {
                        id:8,
                        className:"3年级2班"
                    },
                    {
                        id:9,
                        className:"3年级3班"
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                modifyForm: {

                },
                modifyDialogVisible:false,
                activeIndex:"1",

            }
        },
        methods: {
            handleNodeClick(data) {
                console.log(data);
            },
            getPhoto() {
                return require("../../assets/img/ldh.png");
            },
            addStudent() {

            },
            handleEdit(index, data) {
                _this.modifyForm  = data;
                _this.modifyDialogVisible = true;
            }

        },
        computed: {

        },

        filters: {},

        created: function () {


        },
        mounted: function () {
        }
    }
</script>
<style>

</style>
