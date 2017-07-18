import React from 'react';


const longText = {
    maxWidth: "100px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
};

export default class Tabla extends React.Component{
    constructor(props){
        super(props);
}

    comprobarHeader(row,column){
        if(column.hasOwnProperty("render")){
            return column.render(row[column.column])
        }else{
            if(row.hasOwnProperty(column.column)){
                return row[column.column];
            }else{
                return "";
            }
        }
    }

    verificarStyle(column) {
        if (column.hasOwnProperty("longText") && column["longText"]) return longText;
        return {};
    }


    render(){
        return(
            <div className="table-responsive" style={{marginBottom:"15px"}}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {this.props.Header.map((item,index)=>{
                                return(
                                    <th key={index}>
                                        {item.label}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.source.map((item,index)=>{
                        return(
                            <tr key={index}>
                                {this.props.Header.map((subItem,subIndex)=>{
                                    return(
                                        <td key={subIndex} style={this.verificarStyle(subItem)}>
                                            { this.comprobarHeader(item,subItem)}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}