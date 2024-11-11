import { Widget } from '~/Components/Widgets';

import { IoBarChart, IoDocument, IoHome } from 'react-icons/io5';
import { MdDashboard, MdBarChart } from 'react-icons/md';
import {
    CheckTable,
    ComplexTable,
    TotalSpent,
    WeeklyRevenue,
} from '~/Components/Widgets';

import { columnsDataCheck, columnsDataComplex } from '~/Constants/data';

import tableDataCheck from '~/Constants/tableDataCheck.json';
import tableDataComplex from '~/Constants/tableDataComplex.json';
import DailyTraffic from '~/Components/Widgets/DailyTraffic';
import PieChartCard from '~/Components/PieChartCard';
import TaskCard from '~/Components/Card/TaskCard';
import MiniCalendar from '~/Components/Calendar';

function Dashboard() {
    return (
        <div>
            <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                <Widget
                    icon={<IoBarChart className="size-7" />}
                    title={'Earnings'}
                    subtitle={'$340.5'}
                />
                <Widget
                    icon={<IoDocument className="size-7" />}
                    title={'Spend this month'}
                    subtitle={'$642.39'}
                />
                <Widget
                    icon={<MdBarChart className="size-7" />}
                    title={'Sales'}
                    subtitle={'$574.34'}
                />
                <Widget
                    icon={<MdDashboard className="h-6 w-6" />}
                    title={'Your Balance'}
                    subtitle={'$1,000'}
                />
                <Widget
                    icon={<MdBarChart className="h-7 w-7" />}
                    title={'New Tasks'}
                    subtitle={'145'}
                />
                <Widget
                    icon={<IoHome className="h-6 w-6" />}
                    title={'Total Projects'}
                    subtitle={'$2433'}
                />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <TotalSpent />
                <WeeklyRevenue />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
                {/* Check Table */}
                <div>
                    <CheckTable
                        columnsData={columnsDataCheck}
                        tableData={tableDataCheck}
                    />
                </div>

                <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
                    <DailyTraffic />
                    <PieChartCard />
                </div>

                <ComplexTable
                    columnsData={columnsDataComplex}
                    tableData={tableDataComplex}
                />

                <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
                    <TaskCard />
                    <div className="grid grid-cols-1 rounded-[20px]">
                        <MiniCalendar />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
