export const groupByType = (data: any) => {
    return data.reduce((acc: any, item: any) => {
        // If this type doesn't exist in our accumulator yet, create it
        if (!acc[item.type]) {
          acc[item.type] = {
            type: item.type,
            classes: []
          };
        }
        
        // Add the current item to its type's classes array
        acc[item.type].classes.push(item);
        
        return acc;
      }, {});
}