import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChatbotService, ChatMessage, ChatResponse } from './chatbot.service';

describe('ChatbotService', () => {
  let service: ChatbotService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChatbotService]
    });

    service = TestBed.inject(ChatbotService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.apiUrl).toBe('https://8fxksr8bh7.execute-api.us-east-2.amazonaws.com');
    expect(service.messages).toEqual([]);
    expect(service.isLoading).toBeFalse();
    expect(service.error).toBeNull();
  });

  it('should not send empty or whitespace messages', (done) => {
    service.sendMessage('   ').subscribe({
      next: () => fail('Should have failed'),
      error: (err) => {
        expect(err.message).toBe('Message cannot be empty');
        expect(service.messages.length).toBe(0);
        expect(service.isLoading).toBeFalse();
        done();
      }
    });

    httpMock.expectNone(service.apiUrl);
  });

  it('should store user message in running list and send POST request with message and history', () => {
    const userText = 'Hello there!';
    const mockReply: ChatResponse = { reply: 'Hi! How can I help you today?' };

    let emittedLoadingStates: boolean[] = [];
    service.isLoading$.subscribe(state => emittedLoadingStates.push(state));

    service.sendMessage(userText).subscribe(response => {
      expect(response).toEqual(mockReply);
    });

    // Verify user message was added to state
    expect(service.messages.length).toBe(1);
    expect(service.messages[0]).toEqual({
      role: 'user',
      content: [{ text: userText }]
    });
    expect(service.isLoading).toBeTrue();

    // Verify HTTP request
    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      message: userText,
      history: []
    });

    // Respond with mock data
    req.flush(mockReply);

    // Verify assistant message was added
    expect(service.messages.length).toBe(2);
    expect(service.messages[1]).toEqual({
      role: 'assistant',
      content: [{ text: mockReply.reply }]
    });
    expect(service.isLoading).toBeFalse();
    expect(service.error).toBeNull();
  });

  it('should send accumulated history with subsequent queries', () => {
    const firstUserText = 'My name is Benjamin';
    const firstReply: ChatResponse = { reply: 'Nice to meet you, Benjamin!' };

    service.sendMessage(firstUserText).subscribe();
    const req1 = httpMock.expectOne(service.apiUrl);
    req1.flush(firstReply);

    expect(service.messages.length).toBe(2);

    const secondUserText = 'What is my name?';
    const secondReply: ChatResponse = { reply: 'Your name is Benjamin.' };

    service.sendMessage(secondUserText).subscribe();
    const req2 = httpMock.expectOne(service.apiUrl);

    // History in the 2nd request should include previous messages
    expect(req2.request.body).toEqual({
      message: secondUserText,
      history: [
        { role: 'user', content: [{ text: firstUserText }] },
        { role: 'assistant', content: [{ text: firstReply.reply }] }
      ]
    });

    req2.flush(secondReply);

    expect(service.messages.length).toBe(4);
    expect(service.messages[3]).toEqual({
      role: 'assistant',
      content: [{ text: secondReply.reply }]
    });
  });

  it('should handle API errors gracefully and update error and loading states', () => {
    const userText = 'Trigger error';

    service.sendMessage(userText).subscribe({
      next: () => fail('Should have failed'),
      error: () => {
        expect(service.isLoading).toBeFalse();
        expect(service.error).toBe('Backend error occurred');
      }
    });

    const req = httpMock.expectOne(service.apiUrl);
    req.flush({ message: 'Backend error occurred' }, { status: 500, statusText: 'Server Error' });

    expect(service.error).toBe('Backend error occurred');
    expect(service.isLoading).toBeFalse();
  });

  it('should clear history and reset state', () => {
    service.addMessage({ role: 'user', content: [{ text: 'test' }] });
    expect(service.messages.length).toBe(1);

    service.clearHistory();
    expect(service.messages.length).toBe(0);
    expect(service.error).toBeNull();
  });

  it('should clear error state', () => {
    service.sendMessage('error').subscribe({ error: () => {} });
    const req = httpMock.expectOne(service.apiUrl);
    req.flush('Error', { status: 500, statusText: 'Error' });

    expect(service.error).toBeTruthy();
    service.clearError();
    expect(service.error).toBeNull();
  });
});
