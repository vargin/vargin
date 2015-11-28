Condition
 = main:Expression other:(_ LogicalOperator _ Expression)* {
   var expressions = other.map(function(tokens) {
     var expression = tokens[3];
     return {
       anchor: tokens[1],
       left: expression.left,
       operator: expression.operator,
       right: expression.right
     };
   });

   expressions.unshift(main);

   return expressions;
 }

Expression
 = left:BindingType _ operator:ComparisonOperator _ right:(PrimitiveType / BindingType ) {
   return {
     left: left,
     operator: operator,
     right: right
   };
 }

Operator
 = ComparisonOperator

LogicalOperator
 = LogicalOperatorAND / LogicalOperatorOR

LogicalOperatorAND
 = "&&" {
   return { type: "operator", value: "&&" };
 }

LogicalOperatorOR
 = "||" {
   return { type: "operator", value: "||" };
 }

ComparisonOperator
 = ComparisonOperatorEqual

ComparisonOperatorEqual
 = "=" {
   return { type: "operator", value: "equal" };
 }

PrimitiveType
 = String / Boolean

String
 = "\"" v:([a-zA-Z0-9_]+) "\"" {
   return { type: "string", value: v.join("") };
 }

Boolean
 = v:("true" / "false") {
   return { type: "boolean", value: Boolean(v) };
 }

BindingType
 = DataBinding / ControlBinding / ForeignControlBinding

DataBinding
 = "{{" _ v:([a-zA-Z0-9_]+) _ "}}" {
   return { type: "data-binding", value: v.join("") };
 }

ControlBinding
 = "[[" _ v:([a-zA-Z0-9_]+) _ "]]" {
   return { type: "control-binding", value: v.join("") };
 }

ForeignControlBinding
  = "[[" _ c:([a-zA-Z0-9_]+) "." v:([a-zA-Z0-9_]+) _ "]]" {
    return {
      type: "foreign-control-binding",
      value: { control: c.join(""), property: v.join("")}
    };
  }

_ "whitespace"
  = [ \t\n\r]*