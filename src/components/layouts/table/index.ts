import { type DefineComponent, FunctionalComponent } from "vue";
import inputInsert from "@/components/layouts/table/menu/inputInsert.vue";
import colorSelect from "@/components/layouts/table/menu/colorSelect.vue";
import {
    OctagonX,
    Files,
    Bold,
    Scissors,
    BetweenHorizontalEnd,
    Text,
    AlignRight,
    AlignCenter,
    AlignLeft,
    TableCellsMerge,
    SquareFunction,
    Type,
    PaintBucket,
    ListMinus,
    ChartNoAxesColumn,
    Grid3x3,
    BetweenVerticalStart,
    BetweenHorizontalStart,
    BetweenVerticalEnd,
    Sigma,
    ChartNoAxesGantt,
    Braces,
    Percent,
} from "lucide-vue-next";
import Handsontable from "handsontable";
interface IExtraOption {
    label: string;
    icon: DefineComponent | FunctionalComponent;
    handler?: (event: { row: number; col: number }) => any;
    extra?: any;
}
interface IOption {
    label: string;
    icon: DefineComponent | FunctionalComponent;
    handler?: (event: { row: number; col: number }, ...args: any) => any;
    options?: IOption[];
    extra?: any;
}
const renderer = (instance: any, td: any, row: number, col: number) => {
    const className = instance.getCellMeta(row, col).className || "";
    const backgroundColor =
        instance.getCellMeta(row, col).backgroundColor || "#fff";
    const color = instance.getCellMeta(row, col).color || "#000";
    const fontSize = instance.getCellMeta(row, col).fontSize || "13px";
    td.style.fontSize = fontSize;
    td.style.color = color;
    td.style.backgroundColor = backgroundColor;
    td.className = className;
};
// 统一添加样式
const addStyle = (
    event: number[],
    addProperty: string,
    property: string,
    hotInstance: Handsontable,
) => {
    const tableCoordinates: { row: number; col: number }[] = [];
    const [rowstart, colstart, rowend, colend] = event;

    // 收集需要更新的单元格坐标
    for (let row = rowstart; row <= rowend; row++) {
        for (let col = colstart; col <= colend; col++) {
            tableCoordinates.push({ row, col });
        }
    }

    let allHaveBold = true;

    // 检查是否所有选中的单元格都有font-bold
    tableCoordinates.forEach((cell) => {
        const classNames =
            hotInstance.getCellMeta(cell.row, cell.col).className || "";
        if (!classNames.includes("font-bold")) {
            allHaveBold = false;
        }
    });

    // 如果所有单元格都有font-bold, 则移除
    if (allHaveBold && addProperty === "font-bold") {
        tableCoordinates.forEach((cell) => {
            const classNames =
                (hotInstance.getCellMeta(cell.row, cell.col)
                    .className as string) || "";
            const updatedClassNames = classNames
                .split(" ")
                .filter((className) => className !== "font-bold")
                .join(" ");
            hotInstance.setCellMeta(
                cell.row,
                cell.col,
                "className",
                updatedClassNames,
            );
            hotInstance.setCellMeta(cell.row, cell.col, "renderer", renderer);
        });
    } else {
        // 如果没有全部是font-bold，则添加font-bold
        tableCoordinates.forEach((cell) => {
            if (property == "className") {
                const existingClassNames =
                    (hotInstance.getCellMeta(cell.row, cell.col)[
                        property
                    ] as string) || "";
                const uniqueClassNames = [
                    ...new Set(existingClassNames.split(" ")),
                ].join(" ");
                addProperty = `${uniqueClassNames} ${addProperty}`;
            }
            hotInstance.setCellMeta(cell.row, cell.col, property, addProperty);
            hotInstance.setCellMeta(cell.row, cell.col, "renderer", renderer);
        });
    }

    // 更新渲染
    hotInstance.render();
};

export class contextMenuInstance {
    hotInstance: Handsontable;
    selectCell: number[] | undefined;

    constructor(hotInstance: Handsontable) {
        this.hotInstance = hotInstance;
    }

    //更新当前选中的单元格
    updateSelectCell(coords: any) {
        this.selectCell = [...coords];
    }
    private createHandler(
        callback: (
            event: number[],
            hotInstance: Handsontable,
            ...args: any[]
        ) => void,
    ) {
        return (value: any) => {
            if (this.selectCell && this.hotInstance) {
                callback(this.selectCell, this.hotInstance, value);
            } else {
                console.error("未选中单元格或 Handsontable 实例未定义");
            }
        };
    }
    // 返回快捷选项
    getQuickOptions(): IExtraOption[] {
        return [
            {
                label: "复制",
                icon: Files,
                handler: this.createHandler((event, hotInstance) => {
                    const [row, col, ...rest] = event;
                    hotInstance.selectCell(row, col, ...rest);
                    document.execCommand("copy");
                }),
            },
            {
                label: "剪切",
                icon: Scissors,
                handler: this.createHandler((event, hotInstance) => {
                    const [row, col, ...rest] = event;
                    hotInstance.selectCell(row, col, ...rest);
                    console.log(event, row, col, ...rest);

                    document.execCommand("cut");
                }),
            },
            {
                label: "文本颜色",
                icon: Type,
                extra: {
                    component: colorSelect,
                    props: {
                        handler: this.createHandler(
                            (event, hotInstance, value) => {
                                addStyle(event, value, "color", hotInstance);
                            },
                        ),
                    },
                },
            },
            {
                label: "加粗",
                icon: Bold,
                handler: this.createHandler((event, hotInstance) => {
                    addStyle(event, "font-bold", "className", hotInstance);
                }),
            },
            {
                label: "颜色填充",
                icon: PaintBucket,
                extra: {
                    component: colorSelect,
                    props: {
                        handler: this.createHandler(
                            (event, hotInstance, value) => {
                                addStyle(
                                    event,
                                    value,
                                    "backgroundColor",
                                    hotInstance,
                                );
                            },
                        ),
                    },
                },
            },
        ];
    }
    // 返回自定义选项
    getCustomOptions(): IOption[] {
        return [
            {
                label: "删除",
                icon: OctagonX,
                options: [
                    {
                        label: "删除当前行",
                        icon: ListMinus,
                        handler: this.createHandler((event, hotInstance) => {
                            const [rowstart, _, rowend, __] = event;
                            hotInstance.alter("remove_row", rowstart, rowend);
                        }),
                    },
                    {
                        label: "删除当前列",
                        icon: ChartNoAxesColumn,
                        handler: this.createHandler((event, hotInstance) => {
                            const [_, colstart, _event, colend] = event;
                            hotInstance.alter("remove_col", colstart, colend);
                        }),
                    },
                    {
                        label: "清除所有内容",
                        icon: Grid3x3,
                        handler: this.createHandler((_, hotInstance) => {
                            hotInstance.clear();
                        }),
                    },
                ],
            },
            {
                label: "插入",
                icon: BetweenHorizontalEnd,
                options: [
                    {
                        label: "插入",
                        icon: BetweenVerticalStart,
                        extra: {
                            component: inputInsert,
                            props: {
                                type: "上",
                                handler: this.createHandler(
                                    (event, hotInstance, value) => {
                                        console.log(value, event, hotInstance);
                                        const [selectedRow] = event;
                                        hotInstance.alter(
                                            "insert_row_above",
                                            selectedRow,
                                            value,
                                        );
                                    },
                                ),
                            },
                        },
                    },
                    {
                        label: "插入",
                        icon: BetweenVerticalEnd,
                        handler: this.createHandler((event) => {
                            console.log(event);
                            console.log(this.selectCell);
                        }),
                        extra: {
                            component: inputInsert,
                            props: {
                                type: "下",
                                handler: this.createHandler(
                                    (event, hotInstance, value) => {
                                        console.log(value, event, hotInstance);

                                        const [_, __, selectedRow] = event;
                                        hotInstance.alter(
                                            "insert_row_below",
                                            selectedRow,
                                            value,
                                        );
                                    },
                                ),
                            },
                        },
                    },
                    {
                        label: "插入",
                        icon: BetweenHorizontalStart,
                        handler: this.createHandler((event) => {
                            console.log(event);
                        }),
                        extra: {
                            component: inputInsert,
                            props: {
                                type: "左",
                                handler: this.createHandler(
                                    (event, hotInstance, value) => {
                                        console.log(value, event, hotInstance);

                                        const [_, selectedCol] = event;
                                        hotInstance.alter(
                                            "insert_col_start",
                                            selectedCol,
                                            value,
                                        );
                                    },
                                ),
                            },
                        },
                    },
                    {
                        label: "插入",
                        icon: BetweenHorizontalEnd,
                        handler: this.createHandler((event) => {
                            console.log(event);
                        }),
                        extra: {
                            component: inputInsert,
                            props: {
                                type: "右",
                                handler: this.createHandler(
                                    (event, hotInstance, value) => {
                                        console.log(value, event, hotInstance);
                                        const selectedCol = event[3];
                                        hotInstance.alter(
                                            "insert_col_end",
                                            selectedCol,
                                            value,
                                        );
                                    },
                                ),
                            },
                        },
                    },
                ],
            },
            {
                label: "对齐方式",
                icon: Text,
                options: [
                    {
                        label: "左对齐",
                        icon: AlignLeft,
                        handler: this.createHandler((event, hotInstance) => {
                            addStyle(
                                event,
                                "htLeft htMiddle",
                                "className",
                                hotInstance,
                            );
                        }),
                    },
                    {
                        label: "居中对齐",
                        icon: AlignCenter,
                        handler: this.createHandler((event, hotInstance) => {
                            addStyle(
                                event,
                                "htCenter htMiddle",
                                "className",
                                hotInstance,
                            );
                        }),
                    },
                    {
                        label: "右对齐",
                        icon: AlignRight,
                        handler: this.createHandler((event, hotInstance) => {
                            addStyle(
                                event,
                                "htRight htMiddle",
                                "className",
                                hotInstance,
                            );
                        }),
                    },
                ],
            },
            {
                label: "单元格合并",
                icon: TableCellsMerge,
                handler: this.createHandler((event, hotInstance) => {
                    const [startRow, startColumn, endRow, endColumn] = event;
                    hotInstance
                        .getPlugin("mergeCells")
                        .merge(startRow, startColumn, endRow, endColumn);
                }),
            },
            {
                label: "常见公式",
                icon: SquareFunction,
                options: [
                    {
                        label: "SUM 求和",
                        icon: Sigma,
                        handler: this.createHandler((event, hotInstance) => {
                            const [_, __, endRow, endColumn] = event;
                            hotInstance.setDataAtCell(
                                endRow,
                                endColumn,
                                `=SUM(A1,A1)`,
                            );
                        }),
                    },
                    {
                        label: "AVERAGE 求平均",
                        icon: ChartNoAxesGantt,
                        handler: this.createHandler((event, hotInstance) => {
                            const [_, __, endRow, endColumn] = event;
                            hotInstance.setDataAtCell(
                                endRow,
                                endColumn,
                                `=AVERAGE(A1,A1)`,
                            );
                        }),
                    },
                    {
                        label: "IF 条件判断",
                        icon: Braces,
                        handler: this.createHandler((event, hotInstance) => {
                            const [_, _event, endRow, endColumn] = event;
                            hotInstance.setDataAtCell(
                                endRow,
                                endColumn,
                                `=IF(A1 > 0,'true','false')`,
                            );
                        }),
                    },
                    {
                        label: "MOD 求余",
                        icon: Percent,
                        handler: this.createHandler((event, hotInstance) => {
                            const [_, __, endRow, endColumn] = event;
                            hotInstance.setDataAtCell(
                                endRow,
                                endColumn,
                                `=MOD(数值,除数)`,
                            );
                        }),
                    },
                ],
            },
        ];
    }
}
