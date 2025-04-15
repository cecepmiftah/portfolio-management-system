<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactFormSubmitted extends Notification
{
    use Queueable;

    public $formData;

    /**
     * Create a new notification instance.
     */
    public function __construct(array $formData)
    {
        $this->formData = $formData;
    }


    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Contact Form Submission')
            ->line('You have received a new contact form submission:')
            ->line('Name: ' . $this->formData['name'])
            ->line('Email: ' . $this->formData['email'])
            ->line('Message: ' . $this->formData['message'])
            ->action('View Profile', url('/user/' . $notifiable->username));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
