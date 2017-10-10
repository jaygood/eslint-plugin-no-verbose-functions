
module.exports.rules = {
  functions: context => ({
    FunctionExpression(node) {
      if (node.type === 'FunctionExpression') {
        // is single line function
        if (node.body && node.body.body && node.body.body.length === 1 && node.body.body[0].expression.type === 'CallExpression') {
          const params = node.body.body[0].expression.arguments;
          console.info(params)
          context.report(node,  'function looks like a verbose wrapper');
        }
      }
    }
  })
};
