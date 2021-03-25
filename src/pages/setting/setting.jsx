import  React,{Component} from 'react';
import BasicInfo from "./basic-info"
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

export default class Setting extends Component {



    render() {
        const tabsList = [
            {
                id: 1,
                tab: '基本信息',
                pageRender: () => <BasicInfo {...this.props} />
            }
        ];
        return (
            <div>
                <Tabs defaultActiveKey='1'>
                    {
                        tabsList.map(({ tab, id, pageRender }) =>
                            <TabPane tab={tab} key={id}>
                                {
                                    pageRender()
                                }
                            </TabPane>
                        )
                    }
                </Tabs>
            </div>
        )
    }
}