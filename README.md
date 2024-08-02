# React Quiz Engine

This application is a simple Quiz Engine built with React and Typescript

Author: Patrick Nicacio de Oliveira


## To run the application follow the instructions

### 1 - Clone the repository

### 2 - Install dependencies

Go to app directory and run the command on terminal

using npm:
```
npm install
```
or yarn
```
yarn
```

### 3 - Run the application locally

Now start the application on localhost by running the following command

```
npm run dev
```
or
```
yarn dev
```

Now the app will be available at localhost:5173

## To manage the quizzes json files

### Editing an existent Quiz

Go to /public/quiz-list/ select and update the quiz you want and save it.

### Adding a new Quiz

#### Step 1
Add your own json file at /public/quiz-list/ directory following this type definition:

```typescript
{
  "quiz_name": string;
  "quiz_description"?: string;
  "questions": [
    {
      "question_id": number;
      "question_title"?: string;
      "question_description"?: string;
      "question_image"?: string;
      "question_text": string;
      "question_type": "one-choice" | "multiple-choice" | "input";
      "answers"?: [
        "answer_id": number;
        "answer_text": string;
      ];
      "question_dependency_id"?: number;
      "question_dependency_answer"?: number;
    }
  ]
}
```

#### Step 2
Update the "Home" component page to show your json file at Quiz selection:
```typescript
  const quizList: QuizListItemType[] = [
    {
      quiz_file_name: "sample-quiz-1",
      quiz_display_name: "Sample 1"
    },
    {
      quiz_file_name: "sample-quiz-2",
      quiz_display_name: "Sample 2"
    }, 
    {
      quiz_file_name: "your-json-file", //the json file name without extension
      quiz_displa_name: "New Quiz" //a name to show on Home select
    }
  ];
```