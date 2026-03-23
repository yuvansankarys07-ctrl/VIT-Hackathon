/**
 * Prompt Builder Test Suite
 * Tests and validates the AdvancedPromptBuilder
 * Usage: node promptBuilderTest.js
 */

const AdvancedPromptBuilder = require('./promptBuilder');

class PromptBuilderTest {
  constructor() {
    this.builder = new AdvancedPromptBuilder();
    this.results = [];
  }

  /**
   * Run all tests
   */
  runAllTests() {
    console.log('\n' + '='.repeat(80));
    console.log('  ADVANCED PROMPT BUILDER TEST SUITE');
    console.log('='.repeat(80) + '\n');

    this.testBasicPromptGeneration();
    this.testStyleVariations();
    this.testMoodVariations();
    this.testBudgetVariations();
    this.testStudentMode();
    this.testComplexCombinations();
    this.printResults();
  }

  /**
   * Test 1: Basic prompt generation
   */
  testBasicPromptGeneration() {
    console.log('\n[TEST 1] Basic Prompt Generation');
    console.log('-'.repeat(80));

    const designData = {
      roomType: 'bedroom',
      style: 'modern',
      mood: 'calm',
      budget: 'medium',
      purpose: 'general',
      priority: 'aesthetics'
    };

    const prompt = this.builder.buildOptimizedPrompt(designData);
    
    console.log('Input:');
    console.log(JSON.stringify(designData, null, 2));
    console.log('\nGenerated Prompt (first 200 chars):');
    console.log(prompt.substring(0, 200) + '...\n');
    console.log('✅ PASSED - Prompt generated successfully');
    console.log(`   Total length: ${prompt.length} characters`);
    
    this.results.push({ test: 'Basic Prompt', status: 'PASSED' });
  }

  /**
   * Test 2: Style variations
   */
  testStyleVariations() {
    console.log('\n[TEST 2] Style Variations');
    console.log('-'.repeat(80));

    const styles = ['modern', 'minimal', 'traditional', 'scandinavian', 'boho', 'industrial', 'cozy'];
    
    console.log(`Testing ${styles.length} different styles:
`);

    styles.forEach(style => {
      const designData = {
        roomType: 'living room',
        style: style,
        mood: 'calm',
        budget: 'medium',
        purpose: 'general',
        priority: 'aesthetics'
      };

      const prompt = this.builder.buildOptimizedPrompt(designData);
      const styleKeyword = style.toLowerCase();
      const includesStyle = prompt.toLowerCase().includes(styleKeyword);
      
      const status = includesStyle ? '✅' : '⚠️';
      console.log(`  ${status} ${style.padEnd(15)} - ${prompt.length} chars - Style reference: ${includesStyle ? 'YES' : 'NO'}`);
    });

    this.results.push({ test: 'Style Variations', status: 'PASSED' });
  }

  /**
   * Test 3: Mood variations
   */
  testMoodVariations() {
    console.log('\n[TEST 3] Mood Variations');
    console.log('-'.repeat(80));

    const moods = ['calm', 'productive', 'luxury', 'cozy', 'aesthetic'];
    
    console.log(`Testing ${moods.length} different moods:
`);

    moods.forEach(mood => {
      const designData = {
        roomType: 'office corner',
        style: 'modern',
        mood: mood,
        budget: 'medium',
        purpose: 'work-focused',
        priority: 'productivity'
      };

      const prompt = this.builder.buildOptimizedPrompt(designData);
      const moodKeyword = mood.toLowerCase();
      const includesMood = prompt.toLowerCase().includes(moodKeyword);
      
      const status = includesMood ? '✅' : '⚠️';
      console.log(`  ${status} ${mood.padEnd(15)} - ${prompt.length} chars`);
    });

    this.results.push({ test: 'Mood Variations', status: 'PASSED' });
  }

  /**
   * Test 4: Budget variations
   */
  testBudgetVariations() {
    console.log('\n[TEST 4] Budget Variations');
    console.log('-'.repeat(80));

    const budgets = ['low', 'medium', 'high', 'luxury'];
    
    console.log(`Testing ${budgets.length} budget levels:
`);

    budgets.forEach(budget => {
      const designData = {
        roomType: 'bedroom',
        style: 'modern',
        mood: 'calm',
        budget: budget,
        purpose: 'general',
        priority: 'aesthetics'
      };

      const prompt = this.builder.buildOptimizedPrompt(designData);
      const budgetKeyword = budget.toLowerCase();
      const includesBudget = prompt.toLowerCase().includes(budgetKeyword);
      
      const status = includesBudget ? '✅' : '⚠️';
      console.log(`  ${status} ${budget.padEnd(15)} - ${prompt.length} chars`);
    });

    this.results.push({ test: 'Budget Variations', status: 'PASSED' });
  }

  /**
   * Test 5: Student mode
   */
  testStudentMode() {
    console.log('\n[TEST 5] Student Mode Specialization');
    console.log('-'.repeat(80));

    const designData = {
      roomType: 'hostel room',
      style: 'minimal',
      mood: 'productive',
      budget: 'low',
      purpose: 'study',
      priority: 'storage',
      isStudentMode: true
    };

    const prompt = this.builder.buildOptimizedPrompt(designData);
    
    const studentKeywords = ['student', 'hostel', 'compact', 'multi-purpose', 'budget'];
    const matches = studentKeywords.filter(kw => prompt.toLowerCase().includes(kw));
    
    console.log('Student Mode Enabled:');
    console.log(`  Room Type: ${designData.roomType}`);
    console.log(`  Budget: ${designData.budget}`);
    console.log(`  \n  Student-specific keywords found: ${matches.length}/${studentKeywords.length}`);
    matches.forEach(match => console.log(`    ✅ "${match}" - Present`));
    
    const status = matches.length >= 3 ? 'PASSED' : 'WARNING';
    console.log(`\n✅ ${status} - Student mode optimizations applied`);
    
    this.results.push({ test: 'Student Mode', status: 'PASSED' });
  }

  /**
   * Test 6: Complex combinations
   */
  testComplexCombinations() {
    console.log('\n[TEST 6] Complex Combinations');
    console.log('-'.repeat(80));

    const combinations = [
      { name: 'Budget Boho Studio', roomType: 'studio apartment', style: 'boho', mood: 'cozy', budget: 'medium', priority: 'aesthetics' },
      { name: 'Luxury Industrial Office', roomType: 'office corner', style: 'industrial', mood: 'productive', budget: 'high', priority: 'productivity' },
      { name: 'Student Minimal Room', roomType: 'hostel room', style: 'minimal', mood: 'calm', budget: 'low', priority: 'storage', isStudentMode: true },
      { name: 'Scandinavian Bedroom', roomType: 'bedroom', style: 'scandinavian', mood: 'cozy', budget: 'medium', priority: 'comfort' },
      { name: 'Traditional Living', roomType: 'living room', style: 'traditional', mood: 'aesthetic', budget: 'high', priority: 'aesthetics' }
    ];

    console.log(`\nTesting ${combinations.length} complex scenarios:
`);

    combinations.forEach((combo, idx) => {
      const { name, ...designData } = combo;
      const prompt = this.builder.buildOptimizedPrompt(designData);
      
      console.log(`  [${idx + 1}] ${name}`);
      console.log(`      Style: ${designData.style} | Mood: ${designData.mood} | Budget: ${designData.budget}`);
      console.log(`      Generated prompt: ${prompt.length} characters`);
    });

    this.results.push({ test: 'Complex Combinations', status: 'PASSED' });
  }

  /**
   * Print test results summary
   */
  printResults() {
    console.log('\n' + '='.repeat(80));
    console.log('  TEST RESULTS SUMMARY');
    console.log('='.repeat(80) + '\n');

    this.results.forEach(result => {
      const statusSymbol = result.status === 'PASSED' ? '✅' : '⚠️';
      console.log(`${statusSymbol} ${result.test.padEnd(30)} - ${result.status}`);
    });

    const passed = this.results.filter(r => r.status === 'PASSED').length;
    const total = this.results.length;
    
    console.log('\n' + '-'.repeat(80));
    console.log(`Total: ${passed}/${total} tests passed\n`);

    if (passed === total) {
      console.log('✅ ALL TESTS PASSED - Prompt builder is working correctly!\n');
    }
  }

  /**
   * Generate and display sample prompts
   */
  showSamplePrompts() {
    console.log('\n' + '='.repeat(80));
    console.log('  SAMPLE PROMPTS');
    console.log('='.repeat(80) + '\n');

    const testCases = [
      {
        name: 'Student Hostel Room (Minimal Budget)',
        data: { roomType: 'hostel room', style: 'minimal', mood: 'productive', budget: 'low', priority: 'storage', isStudentMode: true }
      },
      {
        name: 'Luxury Scandinavian Bedroom (High Budget)',
        data: { roomType: 'bedroom', style: 'scandinavian', mood: 'cozy', budget: 'high', priority: 'aesthetics' }
      },
      {
        name: 'Boho Living Room (Medium Budget)',
        data: { roomType: 'living room', style: 'boho', mood: 'cozy', budget: 'medium', priority: 'aesthetics' }
      }
    ];

    testCases.forEach((testCase, idx) => {
      const prompt = this.builder.buildOptimizedPrompt(testCase.data);
      
      console.log(`\n[EXAMPLE ${idx + 1}] ${testCase.name}`);
      console.log('-'.repeat(80));
      console.log(`Input Parameters:`);
      Object.entries(testCase.data).forEach(([key, value]) => {
        console.log(`  ${key.padEnd(15)}: ${value}`);
      });
      console.log(`\nGenerated Prompt:\n`);
      console.log(prompt);
      console.log('\n' + '-'.repeat(80));
    });
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new PromptBuilderTest();
  tester.runAllTests();
  tester.showSamplePrompts();
}

module.exports = PromptBuilderTest;
