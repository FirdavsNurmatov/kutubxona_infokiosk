import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Tiklanish paytida pleyerni boshiga qaytarish. */
  onRecover: () => void;
  /** Ekranda hech qachon bo'sh joy qolmasligi uchun zaxira matn. */
  fallbackTitle: string;
}

interface State {
  failed: boolean;
}

/** Xatolikdan keyin qayta urinishgacha kutiladigan vaqt. */
const RECOVERY_MS = 5000;

/**
 * Kutilmagan xatolik yuz bersa ham ekran oq bo'lib qolmasligi kerak.
 *
 * Bunday holatda faqat kutubxona nomi ko'rinadigan sokin kadr chiziladi,
 * bir necha soniyadan so'ng pleyer boshidan (XUSH KELIBSIZ) qayta ishga
 * tushadi.
 */
export default class SignageBoundary extends Component<Props, State> {
  state: State = { failed: false };
  private timer?: number;

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Kioskda konsol yagona iz — xatoni yo'qotib qo'ymaymiz
    console.error('[signage] slayd xatosi:', error, info.componentStack);
    this.timer = window.setTimeout(() => {
      this.props.onRecover();
      this.setState({ failed: false });
    }, RECOVERY_MS);
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer);
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="sg-fallback">
          <p className="sg-fallback-title">{this.props.fallbackTitle}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
