<script>
    export let files;
</script>


<section class="card h-fit scale-in-center">
    {#if files === null}
        <p class="font-bold my-1">Recordings:</p>
        <div class="alert alert-red my-1" role="alert">Recordings have not been loaded.</div>

    {:else}
    <table class="table-auto">
        <thead>
        <tr>
            <th>Video</th>
            <th>File Name</th>
            <th>Created Time</th>
            <th>Modified Time</th>
            <th>Size</th>
            <th>Owner</th>
        </tr>
        </thead>
        <tbody>
        {#each files as file}
            <td><a href={file.webViewLink} target="_blank"  class="text-white text-xl  "><img src={file.thumbnailLink} alt="Dashcam" width="500" height="600"/></a> </td>
            <td>{file.originalFilename}</td>
            <td>{file.createdTime}</td>
            <td>{file.modifiedTime}</td>
            <td>{file.size}</td>
            <td>{file.owners[0].displayName}</td>
        {/each}
        </tbody>
    </table>
  {/if}
</section>