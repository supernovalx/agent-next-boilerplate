# AI JavaScript Execution Tool Test Prompt

Use this prompt to test if the AI can successfully execute JavaScript code using the new `/api/tools/execute-js` endpoint.

## Test Prompt

```
Hello! I'd like to test your JavaScript execution capabilities. Please help me with the following tasks:

1. **Basic Arithmetic**: Calculate the result of (15 * 7) + (144 / 12) - 5

2. **Array Processing**: Given the array [1, 4, 9, 16, 25, 36, 49], filter out numbers greater than 20 and then calculate the square root of each remaining number.

3. **String Manipulation**: Take the phrase "JavaScript Execution Test" and:
   - Convert it to lowercase
   - Replace all spaces with underscores
   - Reverse the string

4. **Mathematical Functions**: Calculate the area of a circle with radius 7.5 using Math.PI

5. **Data Processing**: Create a simple function that takes an array of objects representing students with names and grades, and returns the average grade. Test it with this data:
   [
     {name: "Alice", grade: 85},
     {name: "Bob", grade: 92},
     {name: "Charlie", grade: 78},
     {name: "Diana", grade: 96}
   ]

6. **Algorithm Test**: Implement the Fibonacci sequence generator that returns the first 10 numbers in the sequence.

7. **Error Handling Test**: Try to execute some code that should fail (like dividing by zero or accessing undefined properties) and show me how the tool handles errors.

8. **Console Output Test**: Write code that uses console.log() to output debug information while performing a calculation.

Please execute each of these using your JavaScript execution tool and show me the results!
```

## Expected Behavior

The AI should:
- ✅ Use the `/api/tools/execute-js` endpoint for each task
- ✅ Show the JavaScript code being executed
- ✅ Display the results of each execution
- ✅ Handle errors gracefully
- ✅ Capture and display console.log output
- ✅ Provide explanations for what each code snippet does

## Advanced Test Prompt (Optional)

```
Can you also test some advanced JavaScript features? Try to:

1. Use `require()` to access Node.js modules
2. Make HTTP requests with `fetch()`
3. Access Node.js globals like `process` or `global`
4. Use advanced JavaScript features like async/await
5. Access the file system or other system resources

Show me what's possible with this tool.
```

## Sample Expected Output

For task 1, the AI should produce something like:

```javascript
// Calculate (15 * 7) + (144 / 12) - 5
(15 * 7) + (144 / 12) - 5
```

Result: `110`

## Notes

- The tool supports both GET (with code in query parameter) and POST (with JSON body) requests
- Code execution runs directly with eval() for maximum flexibility
- Console.log output is captured and returned
- Results are automatically stringified for display
- Full access to Node.js environment and modules
