<script lang="ts">
	export let data;
</script>

<div class="chat">
	{data.chatId}
	<div class="dateBubble">24 августа</div>
	<div class="message mine">
		Текст текст текст текст
		<span class="time">
			11:11
			<div class="time-inner">11:11</div>
		</span>
	</div>
	<div class="message mine">
		Текст текст текст текст
		<span class="time">
			11:11
			<div class="time-inner">11:11</div>
		</span>
	</div>
	<div class="message">
		Текст текст текст Текст текст текст текст текст
		<span class="time">
			11:11
			<div class="time-inner">11:11</div>
		</span>
	</div>
	<div class="message">
		Текст текст текст текст
		<span class="time">
			11:11
			<div class="time-inner">11:11</div>
		</span>
	</div>
	<div class="message mine">
		Текст текст текст текст Текст текст текст текст
		<span class="time">
			11:11
			<div class="time-inner">11:11</div>
		</span>
	</div>
	<div class="message mine">
		Текст текст текст текст текст текст
		<span class="time">
			11:11
			<div class="time-inner">11:11</div>
		</span>
	</div>
	<div class="message">
		Текст текст текст текст
		<span class="time">
			11:11
			<div class="time-inner">11:11</div>
		</span>
	</div>
	<div class="message">
		Текст текст текст текст
		<span class="time">
			11:11
			<div class="time-inner">11:11</div>
		</span>
	</div>
	<div class="message">
		Текст текст текст текст Текст текст текст текст Текст текст текст текст Текст текст текст текст
		Текст текст текст текст Текст текст текст текст Текст текст текст текст<span class="time"
			>11:11 <div class="time-inner">11:11</div></span
		>
	</div>
</div>

<style lang="scss">
	.chat {
		padding: 0 8px;
		background: #f6f6f6;
	}

	.dateBubble {
		width: fit-content;
		margin: 16px auto;
		padding: 4px 8px;
		border-radius: 12px;
		background: rgba(60, 60, 67, 0.25);
		backdrop-filter: blur(6px);
		color: #fff;
		font-size: 12px;
		font-weight: bold;
		line-height: 16px;
	}

	.message {
		width: fit-content;
		max-width: 358px;
		margin-top: 8px;
		padding: 6px 12px;
		border-radius: 16px;
		position: relative;
		background: #fff;
		word-break: break-word;
		overflow: auto;

		+ :not(.mine) {
			margin-top: 2px;
		}

		&.mine {
			margin-top: 8px;
			margin-left: auto;
			background: #8d8d8d;
			color: #fff;

			+ .mine {
				margin-top: 2px;
			}

			+ :not(.mine) {
				margin-top: 8px;
			}

			.time {
				color: rgba(235, 235, 245, 0.6);
			}
		}
	}

	.time {
		visibility: hidden;
		color: rgba(60, 60, 67, 0.6);
		font-size: 10px;
		line-height: 12px;
		float: right;
	}

	.time-inner {
		position: absolute;
		bottom: 6px;
		right: 12px;
		visibility: visible;
	}
</style>
