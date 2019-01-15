<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <div style="width: 100%;height: 100%" >
        <el-row >
            <el-date-picker
		            v-model="selectData"
		            type="date"
		            placeholder="选择日期" >
            </el-date-picker >
        </el-row >
	    <el-row style="margin-top: 10px;" >
		     <el-col :span="8" >
			     <table style="width: 350px;height: 420px;" >
				     <tr style="text-align: left" >
					     <td colspan="3" >
					     <span >
					        早班统计
				         </span >
					     </td >
				     </tr >
				     <tr >
					     <td colspan="3" >
						      <div >
							      <el-progress type="circle" :percentage="50" ></el-progress >
						      </div >
						     <span >
						        早班乘坐统计
					         </span >
					     </td >
				     </tr >
				     <tr >
					     <td >
						     <div >
							     <span class="span_number" >
								     1021
							     </span >
							     <br >
							     <span >
								     应乘人数
							     </span >
						     </div >
					     </td >
					     <td >
						     <div >
							     <span class="span_number" >
								     100
							     </span >
							     <br >
							     <span >
								     缺乘人数
							     </span >
						     </div ></td >
					     <td >
						      <div >
							     <span class="span_number" >
								     92%
							     </span >
							       <br >
							     <span >
								     乘车率
							     </span >
						     </div >
					     </td >
				     </tr >
			     </table >
		     </el-col >
		     <el-col :span="8" >
			     <table style="width: 350px;height: 420px;" >
				     <tr style="text-align: left" >
					     <td colspan="3" >
					     <span >
					        午班统计
				         </span >
					     </td >
				     </tr >
				     <tr >
					     <td colspan="3" >
						      <div >
							      <el-progress type="circle" :percentage="80" ></el-progress >
						      </div >
						     <span >
						        午班乘坐统计
					         </span >
					     </td >
				     </tr >
				     <tr >
					     <td >
						     <div >
							     <span class="span_number" >
								     998
							     </span >
							      <br >
							     <span >
								     应乘人数
							     </span >
						     </div >
					     </td >
					     <td >
						     <div >
							     <span class="span_number" >
								     50
							     </span >
							      <br >
							     <span >
								     缺乘人数
							     </span >
						     </div ></td >
					     <td >
						      <div >
							     <span class="span_number" >
								     92%
							     </span >
							       <br >
							     <span >
								     乘车率
							     </span >
						     </div >
					     </td >
				     </tr >
			     </table >
		     </el-col >
		     <el-col :span="8" >
			     <table style="width: 350px;height: 420px;" >
				     <tr style="text-align: left" >
					     <td colspan="3" >
					     <span >
					        晚班统计
				         </span >
					     </td >
				     </tr >
				     <tr >
					     <td colspan="3" >
						      <div >
							      <el-progress type="circle" :percentage="60" ></el-progress >
						      </div >
						     <span >
						        晚班乘坐统计
					         </span >
					     </td >
				     </tr >
				     <tr >
					     <td >
						     <div >
							     <span class="span_number" >
								     1021
							     </span >
							      <br >
							     <span >
								     应乘人数
							     </span >
						     </div >
					     </td >
					     <td >
						     <div >
							     <span class="span_number" >
								     100
							     </span >
							      <br >
							     <span >
								     缺乘人数
							     </span >
						     </div ></td >
					     <td >
						      <div >
							     <span class="span_number" >
								     92%
							     </span >
							       <br >
							     <span >
								     乘车率
							     </span >
						     </div >
					     </td >
				     </tr >
			     </table >
		     </el-col >
	    </el-row >
	    <el-row >
		    <table style="margin-top: 10px;width: 100%;height: 100%;" >
			    <tr style="height: 90px;" >
				    <td style="width: 220px;" >
						<span style="font-size: 18px; color: #bfcbd9" >缺乘名单</span >
				    </td >
				    <td >

				    </td >
			    </tr >
			    <tr >
				    <td style="width: 220px;" >
						<el-tree
								class="filter-tree"
								:data="data2"
								:props="defaultProps"
								default-expand-all
								:filter-node-method="filterNode"
								ref="tree2" >
						</el-tree >
				    </td >
				    <td >
                        <el-table
		                        v-loading="loadingUI"
		                        element-loading-text="获取数据中..."
		                        :data="tableData"
		                        :default-sort="{prop: 'isOldMachine', order: 'descending'}"
		                        border
		                        highlight-current-row
		                        empty-text="暂无数据..."
		                        show-overflow-tooltip="true"
		                        style="width: 100%; " >
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
							                label="头像" >
					                    <template scope="scope" >
					                        <div >
					                            {{scope.row.photo}}
					                        </div >
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
							                sortable
							                label="班级" >
					                </el-table-column >
					                <el-table-column
							                align="center"
							                prop="bus"
							                sortable
							                label="校车" >
					                </el-table-column >
					                <el-table-column
							                align="center"
							                sortable
							                label="站点" >
					                    <template scope="scope" >
					                        <div >
					                            {{scope.row.name}}
					                        </div >
					                    </template >
					                </el-table-column >
                        </el-table >
				    </td >
			    </tr >
		    </table >

	    </el-row >

    </div >
</template >

<script >
    var _this;
    export default {
	    name: "DataBus",
	    components: {},
	    data () {
		    _this = this;
		    return {
			    selectData: '',
			    loadingUI: false,
			    tableData: [],
			    filterText: '',
			    data2: [{
				    id: 1,
				    label: '一级 1',
				    children: [{
					    id: 4,
					    label: '二级 1-1',
				    }]
			    }, {
				    id: 2,
				    label: '一级 2',
				    children: [{
					    id: 5,
					    label: '二级 2-1'
				    }, {
					    id: 6,
					    label: '二级 2-2'
				    }]
			    }, {
				    id: 3,
				    label: '一级 3',
				    children: [{
					    id: 7,
					    label: '二级 3-1'
				    }, {
					    id: 8,
					    label: '二级 3-2'
				    }]
			    }],
		    }
	    },
	    watch: {
		    filterText(val) {
			    this.$refs.tree2.filter(val);
		    }
	    },
	    methods: {
		    filterNode(value, data) {
			    if (!value) return true;
			    return data.label.indexOf(value) !== -1;
		    }
	    },
	    computed: {},

	    filters: {},

	    created: function () {
		    _this.selectData = new Date();

	    },
	    mounted: function () {
	    }
    }
</script >
<style >
	span {
		color: #666666;
		font-size: 14px;
	}

	tr {
		border: #bfcbd9 1px solid;
		text-align: center
	}
	td {
		border: #bfcbd9 1px solid;
		text-align: center
	}

	.span_number {
		font-size: 16px;
	}
</style >
