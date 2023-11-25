<script lang="ts">
	// export let data;
	// import { page } from '$app/stores';

	// const reportId = $page.params.id;
	// const caseInfo = data.trpc.report
	// console.log($caseInfo);
</script>

<div class="wrapper">
	<div class="header">
		<span class="name">
			<div class="image">
				<svg
					width="36"
					height="36"
					viewBox="0 0 36 36"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="18" cy="18" r="18" fill="#8D8D8D" />
					<path
						d="M16.0605 23.3188V15.8042H15.936L10.8311 23.3188H9V12.75H10.8823V20.2793H11.0068L16.1045 12.75H17.9355V23.3188H16.0605Z"
						fill="white"
					/>
					<path d="M22.2786 23.3188H20.3816V12.75H26.9954V14.3906H22.2786V23.3188Z" fill="white" />
				</svg>
			</div>
			Иван Геннадьевич
		</span>
		<div class="menu">
			<svg
				width="32"
				height="32"
				viewBox="0 0 32 32"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M26 18C27.1 18 28 17.1 28 16C28 14.9 27.1 14 26 14C24.9 14 24 14.9 24 16C24 17.1 24.9 18 26 18ZM6 18C7.1 18 8 17.1 8 16C8 14.9 7.1 14 6 14C4.9 14 4 14.9 4 16C4 17.1 4.9 18 6 18ZM16 18C17.1 18 18 17.1 18 16C18 14.9 17.1 14 16 14C14.9 14 14 14.9 14 16C14 17.1 14.9 18 16 18Z"
					fill="black"
				/>
			</svg>
		</div>
	</div>

	<div class="reportData">
		<span>country</span>
		<span>date</span>
	</div>

	<div class="content">
		<h4>Обращение</h4>
		<p class="text">
			Здравствуйте, случилась такая ситуация что мне не дают снять деньги со своего счета в
			Грузинском банке TBC.
		</p>
	</div>

	<a href="/chats" class="chatLink"> icon </a>
</div>

<style lang="scss">
	.wrapper {
		padding: 16px 16px;
	}
	.chatLink {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: #8d8d8d;
		position: fixed;
		bottom: 16px;
		right: 16px;
	}
	.header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 12px;
	}
	.name {
		display: flex;
		align-items: center;
	}
	.image {
		margin-right: 12px;
	}
	.menu {
		cursor: pointer;
	}
	.reportData {
		display: flex;
		margin-bottom: 16px;
	}
	h4 {
		color: #8d8d8d;
		margin-bottom: 5px;
	}
</style>
