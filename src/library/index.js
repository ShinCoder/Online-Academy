

export default {
  async generateString(length) {
    var result = ''
    const characters = 'j4xG2S0lhkWvMLt6BnfIy7Fbdrquse5PZRECmawO38Y9JNozHTXKDpgcVAiU1Q'
  
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return result;
  }
}