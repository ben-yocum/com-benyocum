import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { ChatbotComponent } from './chatbot.component';
import { ChatbotService, ChatMessage, ChatResponse } from './chatbot.service';

describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;
  let chatbotService: ChatbotService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChatbotComponent,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      providers: [ChatbotService]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    chatbotService = TestBed.inject(ChatbotService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty state when there are no messages and not loading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const emptyState = compiled.querySelector('.empty-state');
    expect(emptyState).toBeTruthy();
    expect(emptyState?.textContent).toContain('Welcome to the Chatbot!');
  });

  it('should render message bubbles for user and assistant messages', () => {
    const messages: ChatMessage[] = [
      { role: 'user', content: [{ text: 'Hello, bot!' }] },
      { role: 'assistant', content: [{ text: 'Hello, user!' }] }
    ];

    chatbotService.addMessage(messages[0]);
    chatbotService.addMessage(messages[1]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const bubbles = compiled.querySelectorAll('.message-bubble');
    expect(bubbles.length).toBe(2);

    expect(bubbles[0].classList.contains('user-bubble')).toBeTrue();
    expect(bubbles[0].textContent).toContain('You');
    expect(bubbles[0].textContent).toContain('Hello, bot!');

    expect(bubbles[1].classList.contains('assistant-bubble')).toBeTrue();
    expect(bubbles[1].textContent).toContain('Assistant');
    expect(bubbles[1].textContent).toContain('Hello, user!');
  });

  it('should disable input and send button when loading', async () => {
    component.userInput = 'Test message';
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('.chat-input-field input') as HTMLInputElement;
    const sendButton = compiled.querySelector('.send-button') as HTMLButtonElement;

    expect(input.disabled).toBeFalse();
    expect(sendButton.disabled).toBeFalse();

    // Trigger loading state via service
    (chatbotService as any)._isLoading$.next(true);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.disabled).toBeTrue();
    expect(sendButton.disabled).toBeTrue();

    // Verify loading indicator is displayed
    const loadingRow = compiled.querySelector('.loading-row');
    expect(loadingRow).toBeTruthy();
    expect(loadingRow?.textContent).toContain('Thinking...');
  });

  it('should disable send button when input is empty or whitespace', () => {
    component.userInput = '   ';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const sendButton = compiled.querySelector('.send-button') as HTMLButtonElement;
    expect(sendButton.disabled).toBeTrue();
  });

  it('should call sendMessage on service and clear input on form submit', () => {
    const sendMessageSpy = spyOn(chatbotService, 'sendMessage').and.returnValue(
      of({ reply: 'Backend response' } as ChatResponse)
    );

    component.userInput = 'Hello world';
    component.sendMessage();

    expect(sendMessageSpy).toHaveBeenCalledWith('Hello world');
    expect(component.userInput).toBe('');
  });

  it('should render errors gracefully and allow retry and dismiss', () => {
    (chatbotService as any)._error$.next('Unable to connect to the server');
    chatbotService.addMessage({ role: 'user', content: [{ text: 'Failed query' }] });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const errorBanner = compiled.querySelector('.error-banner');
    expect(errorBanner).toBeTruthy();
    expect(errorBanner?.textContent).toContain('Unable to connect to the server');

    // Test retry
    const sendMessageSpy = spyOn(chatbotService, 'sendMessage').and.returnValue(
      of({ reply: 'Recovered' } as ChatResponse)
    );
    const retryButton = errorBanner?.querySelector('.retry-button') as HTMLButtonElement;
    retryButton.click();

    expect(sendMessageSpy).toHaveBeenCalledWith('Failed query');

    // Test dismiss
    (chatbotService as any)._error$.next('Another error');
    fixture.detectChanges();
    const dismissButton = compiled.querySelector('.error-banner button[aria-label="Dismiss error"]') as HTMLButtonElement;
    dismissButton.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.error-banner')).toBeNull();
  });

  it('should clear history when Clear button is clicked', () => {
    const clearSpy = spyOn(chatbotService, 'clearHistory').and.callThrough();

    const compiled = fixture.nativeElement as HTMLElement;
    const clearButton = compiled.querySelector('.clear-button') as HTMLButtonElement;
    clearButton.click();

    expect(clearSpy).toHaveBeenCalled();
  });
});
