export const groupByType = (data: any) => {
    const grouped = data.reduce((acc: any, item: any) => {
      if (!acc[item.type]) {
        acc[item.type] = { type: item.type, classes: [] };
      }
      acc[item.type].classes.push(item);
      return acc;
    }, {});

    return Object.values(grouped);
}