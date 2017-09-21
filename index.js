// Don't allow typeof comparisons with "undefined" or "number"
const VALID_TYPES = ['symbol', 'object', 'boolean', 'string', 'function', 'number'];
const OPERATORS = ['==', '===', '!=', '!=='];

module.exports.rules = {
  undefined: context => ({
    UnaryExpression(node) {
      if (node.type === 'UnaryExpression' && node.operator === 'typeof') {
        const parent = context.getAncestors().pop();
        if (parent.type === 'BinaryExpression' && OPERATORS.includes(parent.operator)) {
          const sibling = parent.left === node ? parent.right : parent.left;
          if (sibling.type === 'Literal' || sibling.type === 'TemplateLiteral' && !sibling.expressions.length) {
            const value = sibling.type === 'Literal' ? sibling.value : sibling.quasis[0].value.cooked;
            if (!VALID_TYPES.includes(value)) {
              context.report({node: sibling, message: `${value} is not permitted in typeof operation`});
            }
          }
        }
      }
    }
  })
};
