import { ArrayNode, LeafNode } from '../form-factory/form-node';

export function processFormNode(formNode, key, formDiagnosisNodes) {
  if (!formNode.children) return;

  const { children } = formNode;

  // Condition for diagnosisGroup nodes
  const childNodeForKey = children[key];
  if (
    childNodeForKey instanceof ArrayNode &&
    childNodeForKey.question.extras.type === 'diagnosisGroup'
  ) {
    return [...Object.values(childNodeForKey.children)];
  }

  // Condition for diagnosis nodes
  Object.values(children).forEach((child: LeafNode) => {
    const { question, nodeIndex } = child;
    if (
      question.extras?.type === 'diagnosis' &&
      !formDiagnosisNodes.some((x) => x.nodeIndex === nodeIndex)
    ) {
      return child;
    }
  });
}
